import { useState, useEffect } from 'react';
import { analyticsService } from '../services/analyticsService';

export function useDashboardData(studentId: string) {
  const [data, setData] = useState({ attendance: 0, trends: [], prediction: null });

  useEffect(() => {
    async function loadData() {
      const [perc, trend, pred] = await Promise.all([
        analyticsService.getAttendancePercentage(studentId),
        analyticsService.getPerformanceTrends(studentId),
        analyticsService.getAIPrediction(studentId)
      ]);
      setData({ attendance: perc, trends: trend, prediction: pred });
    }
    loadData();
  }, [studentId]);

  return data;
}
