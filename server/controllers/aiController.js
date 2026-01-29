import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import Course from '../models/courseModel.js';
dotenv.config();

export const searchWithAi = async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        return res.status(500).json({ message: "Server configuration error: API Key missing" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const prompt = `You are an intelligent assistant for an LMS platform. A user will type any query about what they want to learn. Your task is to understand the intent and return one **most relevant keyword** from the following list of course categories and levels:

- App Development  
- AI/ML  
- AI Tools  
- Data Science  
- Data Analytics  
- Ethical Hacking  
- UI UX Designing  
- Web Development  
- Others  
- Beginner  
- Intermediate  
- Advanced  

Only reply with one single keyword from the list above that best matches the query. Do not explain anything. No extra text.

Query: ${input}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const keyword = response.text().trim(); // Ensure we get clean text

    const courses = await Course.find({
      isPublished: true,
      $or: [
        { title: { $regex: input, $options: 'i' } },
        { subTitle: { $regex: input, $options: 'i' } },
        { description: { $regex: input, $options: 'i' } },
        { category: { $regex: input, $options: 'i' } },
        { level: { $regex: input, $options: 'i' } },
      ],
    });

    if (courses.length > 0) {
      return res.status(200).json(courses);
    } else {
      const courses = await Course.find({
        isPublished: true,
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { subTitle: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
          { category: { $regex: keyword, $options: 'i' } },
          { level: { $regex: keyword, $options: 'i' } },
        ],
      });
      return res.status(200).json(courses);
    }
  } catch (error) {
    console.error("AI Search Error:", error.message); 
    // Return a proper error response so the client doesn't hang
    return res.status(500).json({ message: "AI Service unavailable. Please check API Key or try again later." });
  }
};
