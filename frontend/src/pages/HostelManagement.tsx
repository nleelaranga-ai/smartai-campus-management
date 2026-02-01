import React, { useState } from 'react';
import { Home, Coffee, Tool, ClipboardList, AlertCircle, TrendingDown } from 'lucide-react';

const HostelManagement: React.FC = () => {
  const [activeView, setActiveView] = useState<'room' | 'mess' | 'complaints'>('room');

  const menu = [
    { day: "Monday", breakfast: "Poha & Sprouts", lunch: "Dal Tadka, Rice, Mix Veg", dinner: "Paneer Butter Masala, Roti" },
    { day: "Tuesday", breakfast: "Idli Sambar", lunch: "Rajma Chawal", dinner: "Aloo Gobhi, Paratha" },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Residential Services</h1>
        <p className="text-slate-500">Manage your stay and dining preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* ROOM STATUS CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Home size={24}/></div>
            <h2 className="text-xl font-bold">Room B-402</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Occupancy</span>
              <span className="font-bold">2/2 (Shared)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Block</span>
              <span className="font-bold">Newton Boys Hostel</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-4">
              <div className="bg-indigo-500 h-full w-full"></div>
            </div>
          </div>
        </div>

        {/* MESS STATUS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Coffee size={24}/></div>
            <h2 className="text-xl font-bold">Today's Meals</h2>
          </div>
          <p className="text-sm font-medium text-slate-800">Lunch: <span className="text-slate-500 font-normal">Served until 2:30 PM</span></p>
          <div className="mt-4 p-3 bg-orange-50/50 rounded-lg border border-orange-100">
            <p className="text-xs text-orange-800 font-bold uppercase mb-1">On the Menu</p>
            <p className="text-sm text-orange-900 italic">Special South Indian Thali</p>
          </div>
        </div>

        {/* ALERTS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-50 text-red-600 rounded-xl"><AlertCircle size={24}/></div>
            <h2 className="text-xl font-bold">Maintenance</h2>
          </div>
          <button className="w-full py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition">
            File New Complaint
          </button>
          <p className="text-center text-xs text-slate-400 mt-4">1 active request pending</p>
        </div>
      </div>

      {/* MESS MENU TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Weekly Mess Schedule</h3>
            <button className="text-indigo-600 text-sm font-bold">Download PDF</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-xs font-bold uppercase">
            <tr>
              <th className="px-6 py-4">Day</th>
              <th className="px-6 py-4">Breakfast</th>
              <th className="px-6 py-4">Lunch</th>
              <th className="px-6 py-4">Dinner</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {menu.map((m) => (
              <tr key={m.day} className="hover:bg-slate-50/50 transition text-sm">
                <td className="px-6 py-4 font-bold text-slate-700">{m.day}</td>
                <td className="px-6 py-4 text-slate-500">{m.breakfast}</td>
                <td className="px-6 py-4 text-slate-500">{m.lunch}</td>
                <td className="px-6 py-4 text-slate-500">{m.dinner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HostelManagement;
