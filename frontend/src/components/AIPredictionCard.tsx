import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function AIPredictionCard({ attendance }: { attendance: number }) {
  const isAtRisk = attendance < 75;

  return (
    <div className={`p-4 rounded-xl border-2 ${isAtRisk ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}`}>
      <div className="flex items-center gap-2 mb-2">
        {isAtRisk ? <AlertTriangle className="text-red-600" /> : <CheckCircle className="text-green-600" />}
        <h3 className="font-bold text-gray-800">SmartAI Prediction</h3>
      </div>
      <p className="text-sm text-gray-600">
        {isAtRisk 
          ? "Warning: Your attendance is below the eligibility criteria. You may be barred from final exams." 
          : "Great job! You are currently on track for honors. Maintain this consistency!"}
      </p>
    </div>
  );
}
