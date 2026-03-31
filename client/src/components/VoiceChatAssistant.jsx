import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaMicrophone, FaTimes, FaUser, FaStop, FaPaperPlane } from 'react-icons/fa';
import RobotAvatar from './RobotAvatar';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Configure Axios base URL if not already global
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// Assuming global config or using relative path if proxy set, 
// strictly using what used to be in App.jsx or standard Vite proxy
import { serverUrl } from '../config';

// Assuming global config or using relative path if proxy set, 
// strictly using what used to be in App.jsx or standard Vite proxy
const API_URL = `${serverUrl}/api`; 

/* eslint-disable no-unused-vars */
const markdownComponents = {
    // Custom styling for markdown elements
    p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
    ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2" {...props} />,
    ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2" {...props} />,
    li: ({node, ...props}) => <li className="mb-1" {...props} />,
    h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-2" {...props} />,
    h2: ({node, ...props}) => <h2 className="text-base font-bold mb-2" {...props} />,
    h3: ({node, ...props}) => <h3 className="text-sm font-bold mb-1" {...props} />,
    code: ({node, inline, className, children, ...props}) => {
        return inline ? 
            <code className="bg-gray-200 dark:bg-gray-700 rounded px-1 py-0.5 font-mono text-xs" {...props}>{children}</code> :
            <code className="block bg-gray-200 dark:bg-gray-700 rounded p-2 my-2 font-mono text-xs overflow-x-auto" {...props}>{children}</code>
    }
};
/* eslint-enable no-unused-vars */ 

const VoiceChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Hello! I'm NeuroBot. You can ask me about courses, earnings or anything." }
    ]);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [inputText, setInputText] = useState("");
    const { userData } = useSelector(state => state.user);
    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);
    const chatEndRef = useRef(null);
    const handleUserMessageRef = useRef(null);

    // Keep ref updated with latest callback
    useEffect(() => {
        handleUserMessageRef.current = handleUserMessage;
    });

    // Personalize greeting when userData loads
    useEffect(() => {
        if (userData?.name) {
            setMessages(prev => {
                // If it's still the default message, update it
                if (prev.length === 1 && prev[0].role === 'assistant') {
                    return [{ 
                        role: 'assistant', 
                        text: `Hello ${userData.name}! I'm NeuroBot. You can ask me about courses, earnings, or anything.` 
                    }];
                }
                return prev;
            });
        }
    }, [userData]);

    // Scroll to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            console.warn("Speech Recognition not supported in this browser.");
            return;
        }
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (handleUserMessageRef.current) {
                handleUserMessageRef.current(transcript, true);
            }
        };

        recognitionRef.current = recognition;
        
        // Copy ref value for cleanup
        const synth = synthRef.current;
        return () => {
            if (recognitionRef.current) recognitionRef.current.stop();
            if (synth) synth.cancel();
        };
    }, []);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            // Speak welcome message if first open? Maybe annoying. Let's not.
        }
    };

    const startListening = () => {
        if (isSpeaking) {
            synthRef.current.cancel();
            setIsSpeaking(false);
        }
        recognitionRef.current.start();
    };

    const stopSpeaking = () => {
         if (synthRef.current) {
             synthRef.current.cancel();
             setIsSpeaking(false);
         }
    };

    const speakText = (text) => {
        if (synthRef.current.speaking) {
            synthRef.current.cancel();
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        synthRef.current.speak(utterance);
    };

    const handleSendText = () => {
        if (!inputText.trim()) return;
        handleUserMessage(inputText, false);
        setInputText("");
    };

    const handleUserMessage = async (text, shouldSpeak = true) => {
        if (!text.trim()) return;

        const newMessages = [...messages, { role: 'user', text }];
        setMessages(newMessages);

        // Optimistic UI or loading state could go here
        
         try {
            const res = await axios.post(`${API_URL}/ai/chat`, 
                { 
                    message: text, 
                    history: newMessages.slice(-5) // Send last 5 context 
                },
                { withCredentials: true }
            );

            const aiResponse = res.data.response;
            setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
            if (shouldSpeak) {
                speakText(aiResponse);
            }

        } catch (error) {
            console.error("Chat error:", error);
            const errorMsg = "Sorry, I couldn't reach the server.";
            setMessages(prev => [...prev, { role: 'assistant', text: errorMsg }]);
            speakText(errorMsg);
        }
    };

    if (!userData) return null; // Don't show if not logged in

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 md:w-96 bg-[#09090b] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.8)] border border-white/5 flex flex-col overflow-hidden pointer-events-auto transition-all duration-300 origin-bottom-right">
                    {/* Header */}
                    <div className="bg-[#121214] border-b border-white/5 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <FaRobot className="text-xl text-[#a78bfa]" />
                            </div>
                            <span className="font-bold tracking-tight">NeuroBot</span>
                        </div>
                        <button onClick={toggleChat} className="text-zinc-500 hover:text-white transition-colors">
                            <FaTimes />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="h-96 overflow-y-auto p-4 bg-[#09090b] space-y-4 custom-scrollbar">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm shadow-sm leading-relaxed ${
                                    msg.role === 'user' 
                                    ? 'bg-[#8b5cf6] text-white rounded-br-none' 
                                    : 'bg-[#18181b] text-zinc-100 rounded-bl-none border border-white/5'
                                }`}>
                                    <ReactMarkdown 
                                        remarkPlugins={[remarkGfm]}
                                        components={markdownComponents}
                                    >
                                        {msg.text}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        ))}
                         {isSpeaking && (
                            <div className="flex justify-center">
                                <div className="px-3 py-1 bg-purple-500/10 rounded-full text-[10px] text-purple-400 font-medium tracking-wider uppercase animate-pulse border border-purple-500/20">
                                    Speaking...
                                </div>
                            </div>
                         )}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input Controls */}
                    <div className="p-4 bg-[#121214] border-t border-white/5 flex items-center gap-3">
                         <div className="flex-1 relative">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
                                placeholder="Type a message..."
                                className="w-full bg-[#18181b] border border-zinc-800 text-zinc-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-all placeholder-zinc-600"
                            />
                         </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                             {inputText.trim() ? (
                                <button 
                                    onClick={handleSendText}
                                    className="p-3 bg-[#8b5cf6] text-white rounded-xl hover:bg-[#7c3aed] transition-all shadow-lg active:scale-95"
                                >
                                    <FaPaperPlane className="text-xs" />
                                </button>
                            ) : (
                                isSpeaking ? (
                                    <button
                                        onClick={stopSpeaking}
                                        className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all border border-red-500/20 shadow-sm active:scale-95"
                                        title="Stop Speaking"
                                    >
                                        <FaStop className="text-xs" />
                                    </button>
                                ) : (
                                    <button 
                                        onClick={startListening}
                                        disabled={isListening}
                                        className={`p-3 rounded-xl transition-all shadow-md active:scale-95 border ${
                                            isListening 
                                            ? 'bg-red-500 text-white animate-pulse border-red-400' 
                                            : 'bg-[#18181b] border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600'
                                        }`}
                                        title="Speak"
                                    >
                                        <FaMicrophone className="text-xs" />
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Float Button */}
            <button 
                onClick={toggleChat}
                className="pointer-events-auto transition-transform hover:scale-110 active:scale-95 focus:outline-none"
            >
                <RobotAvatar isListening={isListening} isSpeaking={isSpeaking} />
            </button>
        </div>
    );
};

export default VoiceChatAssistant;
