export const getAttendanceRiskPrediction = async (studentId: string): Promise<{ riskLevel: string; message: string }> => {
  // Integration: Point this to your Render API instead of mock data
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/student/${studentId}/attendance-stats`);
  const data = await response.json();

  const attendancePercentage = data.percentage;

  let riskLevel: string;
  let message: string;

  if (attendancePercentage < 70) {
    riskLevel = 'high';
    message = `CRITICAL: Your attendance is at ${attendancePercentage.toFixed(1)}%. You are below the mandatory 75% threshold. SmartAI predicts a high risk of being barred from final exams.`;
  } else if (attendancePercentage >= 70 && attendancePercentage < 85) {
    riskLevel = 'medium';
    message = `ATTENTION: At ${attendancePercentage.toFixed(1)}%, you are nearing the risk zone. Ensure you attend the next 5 classes to stabilize your eligibility.`;
  } else {
    riskLevel = 'low';
    message = `EXCELLENT: Your ${attendancePercentage.toFixed(1)}% attendance places you in the top tier. Keep this consistency to maintain your academic standing.`;
  }

  return { riskLevel, message };
};
