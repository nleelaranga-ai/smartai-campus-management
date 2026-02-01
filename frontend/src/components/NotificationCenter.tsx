import React, { useState } from 'react';
import { Bell, X, Info, AlertTriangle, CreditCard, GraduationCap, Check } from 'lucide-react';

const NotificationCenter: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Grade Released', msg: 'Results for AI Mid-term are now live.', cat: 'Academic', p: 'High', time: '2 mins ago' },
    { id: 2, title: 'Fee Deadline', msg: 'Semester fees due in 3 days.', cat: 'Finance', p: 'Urgent', time: '1 hour ago' },
    { id: 3, title: 'System Maintenance', msg: 'Portal will be down at midnight.', cat: 'System', p: 'Low', time: '5 hours ago' },
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-50 border-l border-gray-100 flex flex-col animate-in slide-in-from-right duration-300">
      {/* HEADER */}
      <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-slate-50/50">
        <div className="flex items-center gap-2">
            <Bell className="text-blue-600" size={20}/>
            <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {notifications.length}
            </span>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition">
            <X size={20} className="text-gray-400"/>
        </button>
      </div>

      {/* NOTIFICATION LIST */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {notifications.map((n) => (
          <div key={n.id} className={`p-4 rounded-2xl border transition hover:shadow-md cursor-pointer ${
            n.p === 'Urgent' ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100'
          }`}>
            <div className="flex justify-between items-start mb-2">
              <div className={`p-2 rounded-lg ${
                n.cat === 'Academic' ? 'bg-blue-100 text-blue-600' : 
                n.cat === 'Finance' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
              }`}>
                {n.cat === 'Academic' ? <GraduationCap size={16}/> : 
                 n.cat === 'Finance' ? <CreditCard size={16}/> : <Info size={16}/>}
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{n.time}</span>
            </div>
            
            <h4 className={`text-sm font-bold ${n.p === 'Urgent' ? 'text-red-900' : 'text-gray-800'}`}>
                {n.title}
            </h4>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{n.msg}</p>
            
            <div className="mt-3 flex gap-2">
               <button className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline">
                  <Check size={12}/> Mark Read
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <button className="w-full py-2.5 text-xs font-bold text-gray-500 hover:text-gray-800 transition uppercase tracking-tighter">
            Clear All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationCenter;
