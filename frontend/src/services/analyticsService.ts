export const analyticsService = {
  async getPerformanceTrends() {
    // In a real app, this would be a complex SQL query in the backend
    // For now, we calculate a 6-month growth trend
    return [
      { month: 'Sep', performance: 65, attendance: 80 },
      { month: 'Oct', performance: 68, attendance: 82 },
      { month: 'Nov', performance: 75, attendance: 85 },
      { month: 'Dec', performance: 72, attendance: 78 },
      { month: 'Jan', performance: 80, attendance: 90 },
    ];
  },
  
  calculateGPA(grades: number[]) {
    const total = grades.reduce((acc, curr) => acc + curr, 0);
    return (total / grades.length / 25).toFixed(2); // Converts 100-scale to 4.0 GPA
  }
};
