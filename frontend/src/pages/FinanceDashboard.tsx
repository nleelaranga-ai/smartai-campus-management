import React, { useState } from 'react';
import { CreditCard, Download, History, ShieldCheck, DollarSign, PieChart } from 'lucide-react';

const FinanceDashboard: React.FC = () => {
  const [transactions] = useState([
    { id: 'TRX9921', date: '2025-10-15', amount: 45000, status: 'Success', head: 'Tuition Fee' },
    { id: 'TRX8810', date: '2025-08-01', amount: 12000, status: 'Success', head: 'Hostel Fee' },
  ]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Finance</h1>
          <p className="text-gray-500">Manage tuition, scholarships, and payment history.</p>
        </div>
        <div className="flex bg-green-50 border border-green-100 p-4 rounded-xl items-center gap-3">
          <ShieldCheck className="text-green-600" size={24}/>
          <div>
            <p className="text-xs text-green-700 font-bold uppercase">Account Status</p>
            <p className="text-sm font-semibold text-green-800">Fully Paid - No Dues</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SUMMARY CARD */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium mb-1">Total Academic Fee (Annual)</p>
              <h2 className="text-4xl font-black text-gray-900">₹1,20,000.00</h2>
              <div className="mt-4 flex gap-2">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">AY 2025-26</span>
                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded">B.Tech CS</span>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col gap-3">
              <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition">
                <CreditCard size={20}/> Pay Online
              </button>
              <button className="border border-gray-200 text-gray-600 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                <Download size={20}/> Fee Structure
              </button>
            </div>
          </div>

          {/* PAYMENT HISTORY */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center gap-2">
              <History className="text-gray-400" size={20}/>
              <h3 className="font-bold text-gray-800">Transaction History</h3>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase">
                  <th className="px-6 py-4">Ref ID</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-center">Date</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 font-mono text-sm text-blue-600 font-bold">{t.id}</td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{t.head}</td>
                    <td className="px-6 py-4 text-center text-gray-500 text-sm">{t.date}</td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">₹{t.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FEE BREAKDOWN & SCHOLARSHIP */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
             <div className="flex items-center gap-2 mb-6">
               <PieChart className="text-purple-500" size={20}/>
               <h3 className="font-bold text-gray-800">Fee Breakdown</h3>
             </div>
             <div className="space-y-4">
               {[
                 { label: 'Tuition Fee', amount: 85000, color: 'bg-blue-500' },
                 { label: 'Hostel & Mess', amount: 25000, color: 'bg-orange-500' },
                 { label: 'Exam & Lab', amount: 10000, color: 'bg-green-500' }
               ].map((item) => (
                 <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="font-bold">₹{item.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                       <div className={`${item.color} h-full`} style={{ width: `${(item.amount / 120000) * 100}%` }}></div>
                    </div>
                 </div>
               ))}
             </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-3xl text-white shadow-lg shadow-indigo-100">
             <DollarSign size={32} className="mb-4 text-indigo-200 opacity-50"/>
             <h3 className="text-xl font-bold mb-2">Scholarship Applied</h3>
             <p className="text-indigo-100 text-sm mb-6">You have received the "Merit-cum-Means" scholarship covering 25% of tuition fees.</p>
             <div className="bg-white/10 p-4 rounded-xl">
                <p className="text-xs font-bold uppercase text-indigo-200">Total Discount</p>
                <p className="text-2xl font-black">- ₹21,250.00</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
