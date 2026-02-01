import React, { useState } from 'react';
import { Users, FileCheck, Calendar, Briefcase, IndianRupee, PieChart, UserPlus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const FacultyHR: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'directory' | 'payroll' | 'leaves'>('directory');

  const staffData = [
    { name: 'Dr. Sarah Smith', dept: 'AI & DS', status: 'Active', id: 'EMP001' },
    { name: 'Prof. Robert Dow', dept: 'Cybersecurity', status: 'On Leave', id: 'EMP002' },
    { name: 'Dr. Emily Blunt', dept: 'Mathematics', status: 'Active', id: 'EMP003' },
  ];

  return (
    <div className="p-8 bg-neutral-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">Human Resources</h1>
          <p className="text-neutral-500">Manage faculty records, payroll cycles, and leave requests.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
          <UserPlus size={18}/> Onboard Staff
        </button>
      </div>

      {/* ANALYTICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
           <p className="text-xs font-bold text-neutral-400 uppercase mb-1">Monthly Payroll</p>
           <h3 className="text-2xl font-black text-neutral-800 tracking-tighter">₹42,50,000.00</h3>
           <p className="text-xs text-green-600 mt-2 font-medium">↑ 4.2% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
           <p className="text-xs font-bold text-neutral-400 uppercase mb-1">Staff Attendance</p>
           <h3 className="text-2xl font-black text-neutral-800 tracking-tighter">94.8%</h3>
           <div className="w-full bg-neutral-100 h-1.5 rounded-full mt-3">
              <div className="bg-indigo-500 h-full w-[94.8%]"></div>
           </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
           <p className="text-xs font-bold text-neutral-400 uppercase mb-1">Open Positions</p>
           <h3 className="text-2xl font-black text-neutral-800 tracking-tighter">12</h3>
           <p className="text-xs text-indigo-600 mt-2 font-medium">Recruitment in progress</p>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="flex border-b border-neutral-50 px-8 py-4 gap-8">
          {['directory', 'payroll', 'leaves'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`text-sm font-bold uppercase tracking-widest pb-1 transition-all ${
                activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-8">
          {activeTab === 'directory' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-neutral-400 text-[11px] font-black uppercase tracking-wider border-b border-neutral-50">
                    <th className="px-4 py-3">Employee ID</th>
                    <th className="px-4 py-3">Staff Name</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50">
                  {staffData.map((s) => (
                    <tr key={s.id} className="hover:bg-neutral-50/50 transition">
                      <td className="px-4 py-5 font-mono text-sm text-indigo-600 font-bold">{s.id}</td>
                      <td className="px-4 py-5 font-bold text-neutral-800">{s.name}</td>
                      <td className="px-4 py-5 text-neutral-500 text-sm font-medium">{s.dept}</td>
                      <td className="px-4 py-5">
                        <span className={`text-[10px] font-black px-2 py-1 rounded-full ${
                          s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-right">
                        <button className="text-indigo-600 font-bold text-xs hover:underline">View Profile</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyHR;
