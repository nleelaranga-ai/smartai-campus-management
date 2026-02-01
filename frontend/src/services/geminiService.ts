// frontend/src/services/geminiService.ts
export const getSmartAIResponse = async (userPrompt: string, studentId: string) => {
  // Fetch real-time risk data from your new SQL View
  const riskRes = await fetch(`${import.meta.env.VITE_API_URL}/api/analytics/risk/${studentId}`);
  const riskData = await riskRes.json(); 

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const systemPrompt = `
    You are the SmartAI Buddy. The student has an attendance of ${riskData.attendance_percentage}%.
    Their current risk status is: ${riskData.risk_status}.
    Provide a specific recovery plan if they are 'High' risk.
  `;

  const result = await model.generateContent([systemPrompt, userPrompt]);
  return result.response.text();
};
