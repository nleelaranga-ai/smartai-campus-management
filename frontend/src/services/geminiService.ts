import { GoogleGenerativeAI } from "@google/genai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getSmartAIResponse = async (userPrompt: string, studentStats: any) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  // Injecting real campus data into the AI's "brain"
  const campusContext = `
    You are the SmartAI Buddy. You are helping a student with the following stats:
    - Current Attendance: ${studentStats.attendance}%
    - Average Grade: ${studentStats.avgGrade}%
    - At Risk subjects: ${studentStats.atRiskSubjects.join(', ') || 'None'}.
    If attendance is below 75%, warn them professionally. Suggest study plans based on their grades.
  `;

  const result = await model.generateContent([campusContext, userPrompt]);
  const response = await result.response;
  return response.text();
};
