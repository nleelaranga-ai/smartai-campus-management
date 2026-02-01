import { GoogleGenerativeAI } from "@google/genai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getSmartAIResponse = async (userPrompt: string, studentData: any) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  // Custom System Instruction for "SmartAI Buddy"
  const systemContext = `You are the SmartAI Buddy for SmartAI Campus. 
  The student asking is ${studentData.name} with ${studentData.attendance}% attendance. 
  Answer their academic questions and help them improve their grades.`;

  const result = await model.generateContent([systemContext, userPrompt]);
  return result.response.text();
};
