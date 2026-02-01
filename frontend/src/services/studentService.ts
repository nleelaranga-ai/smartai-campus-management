export const getStudentExamResults = async (studentId: string): Promise<StudentExamResult[]> => {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/api/student/${studentId}/grades`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  
  if (!response.ok) return [];
  return response.json(); // Fetches from the 'grades' SQL table
};
