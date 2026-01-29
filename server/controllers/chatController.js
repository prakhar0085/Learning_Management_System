import Groq from "groq-sdk";
import Course from "../models/courseModel.js";
import User from "../models/userModel.js";
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const getEducatorStats = async (educatorId) => {
    const courses = await Course.find({ creator: educatorId }).populate('enrolledStudents', 'name email');

    let totalRevenue = 0;
    let totalSales = 0;
    let recentSales = [];

    courses.forEach(course => {
        const salesCount = course.enrolledStudents.length;
        const revenue = (course.price || 0) * salesCount;
        
        totalSales += salesCount;
        totalRevenue += revenue;

        const recentStudents = course.enrolledStudents.slice(-5).reverse();
        recentStudents.forEach(student => {
             recentSales.push({
                course: course.title,
                amount: course.price,
                student: student.name,
            });
        });
    });

    recentSales = recentSales.slice(0, 5);

    return {
        totalRevenue,
        totalSales,
        recentSales
    };
};

const getAllCourses = async () => {
    return await Course.find({ isPublished: true }).select('title price level category description');
};

export const chatWithAi = async (req, res) => {
    try {
        const { message, history } = req.body;
        const userId = req.userId;
        
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        let systemContext = `You are a helpful AI assistant for an LMS platform. You are speaking with a ${user.role}. 
        Your name is "NeuroBot". User's name is ${user.name}.
        
        FORMATTING INSTRUCTIONS:
        - Use **Markdown** to format your response.
        - Use **Bold** for key terms and important values.
        - Use Bullet points for lists.
        - Use short paragraphs for readability.
        - Keep the tone friendly and conversational.
        
        SCOPE & IDENTITY:
        - You are "NeuroBot", a smart and friendly AI assistant.
        - PRIMARY ROLE: Assist with LMS tasks (courses, enrollment, earnings).
        - SECONDARY ROLE: Engage in general conversation (science, history, coding, life) like a normal helpful assistant.
        - If the user asks about something outside the LMS (e.g., "What is photosynthesis?", "Tell me a joke"), ANSWER IT FREELY. Do not restrict yourself to LMS topics only.
        - Be helpful, witty, and human-like.

        
        IMPORTANT: All financial amounts and course prices are in Indian Rupees (₹). Never mention Dollars ($).
        
        
        If a student asks how to enroll in a course, provide these exact steps:
        1. Go to the "All Courses" section.
        2. Browse and choose the course you want to enroll in.
        3. Click on the course card to view details.
        4. Click the "Buy Course" button to make the payment.
        5. Once payment is successful, you will be automatically enrolled.
        `;

        // Always fetch available courses so everyone can search/buy
        const courses = await getAllCourses();
        let dataContext = `
        Here is the list of available courses on the platform:
        ${JSON.stringify(courses)}
        `;
        
        // Base capabilities for everyone
        systemContext += "You can answer questions about available courses, their prices, and details.";

        // If educator, add their stats on top
        if (user.role === 'educator') {
            const stats = await getEducatorStats(userId);
            dataContext += `
            
            Here is the educator's current live data:
            - Total Revenue: ₹${stats.totalRevenue}
            - Total Courses Sold: ${stats.totalSales}
            - Recent 5 Sales: ${JSON.stringify(stats.recentSales)}
            `;
            systemContext += " You can also answer questions about their earnings, sales, and students.";
        }
        
        // Add specific instruction to not hallucinate stats if not present
        if (user.role !== 'educator') {
             systemContext += " Do NOT make up any earnings or sales data for this user as they are a student.";
        }

        // Format history for Groq (OpenAI format)
        // Ensure system message is first
        const messages = [
            { role: "system", content: `${systemContext}\n\nDATA CONTEXT:\n${dataContext}` },
            ...(history || []).map(msg => ({
                role: msg.role === 'assistant' ? 'assistant' : 'user', // Groq uses 'assistant' not 'model'
                content: msg.text
            })),
            { role: "user", content: message }
        ];

        const chatCompletion = await groq.chat.completions.create({
            messages: messages,
            model: "llama-3.3-70b-versatile", // Updated from decommissioned model
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 1,
            stream: false,
            stop: null
        });

        const responseText = chatCompletion.choices[0]?.message?.content || "";

        return res.status(200).json({ 
            response: responseText,
        });

    } catch (error) {
        console.error("Chat Groq Error Details:", error);
        
        const logMessage = `[${new Date().toISOString()}] ${error.name}: ${error.message}\nStack: ${error.stack}\n\n`;
        try {
            fs.appendFileSync('chat_error_log.txt', logMessage);
        } catch (logErr) {
            console.error("Failed to write to local log file:", logErr);
        }

        return res.status(500).json({ 
            message: "I'm having trouble thinking right now.",
            error: error.message // beneficial for debugging
        });
    }
};
