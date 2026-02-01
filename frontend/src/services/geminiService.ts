import { GoogleGenerativeAI } from "@google/genai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getSmartAIBuddyResponse = async (userPrompt: string, studentId: number) => {
  // Fetch real risk data from the SQL View via your Render Backend
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/analytics/risk/${studentId}`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  const riskData = await response.json();

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const systemInstruction = `
    You are the SmartAI Buddy for SmartAI Campus Management.
    Current Student Context:
    - Attendance: ${riskData.attendance_percentage}%
    - Risk Level: ${riskData.risk_status}
    
    If risk is 'High', your tone should be supportive but urgent. 
    If risk is 'Low', be encouraging and suggest advanced topics for them to study.
  `;

  const result = await model.generateContent([systemInstruction, userPrompt]);
  return result.response.text();
};
