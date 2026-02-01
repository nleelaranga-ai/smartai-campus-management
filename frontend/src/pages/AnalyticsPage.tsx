import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useDashboardData } from '../hooks/useDashboardData';

export default function AnalyticsPage() {
  const { trends } = useDashboardData('current-user');

  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Academic Growth Analysis</h2>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trends}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="performance" stroke="#4f46e5" strokeWidth={3} dot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
