import React, { useState } from 'react';
import { Briefcase, GraduationCap, Building2, TrendingUp, Users, Award, ExternalLink } from 'lucide-react';

const PlacementHub: React.FC = () => {
  const [drives] = useState([
    { id: 1, company: 'Google', role: 'SDE-1', package: '32 LPA', deadline: '24 Feb', eligibility: '8.0 CGPA' },
    { id: 2, company: 'Microsoft', role: 'Cloud Engineer', package: '28 LPA', deadline: '01 Mar', eligibility: '7.5 CGPA' },
    { id: 3, company: 'Zomato', role: 'Product Analyst', package: '18 LPA', deadline: '15 Feb', eligibility: 'No Criteria' },
  ]);

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Career & Placement</h1>
          <p className="text-slate-500 mt-2 font-medium">Connecting students with global opportunities and alumni mentors.</p>
        </div>
        <div className="flex gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600"><TrendingUp size={24}/></div>
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Highest Package</p>
                    <p className="text-xl font-black text-slate-800">42.5 LPA</p>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ACTIVE DRIVES LIST */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Briefcase className="text-blue-500" size={20}/> Active Recruitment Drives
            </h2>
            <button className="text-blue-600 text-sm font-bold hover:underline">View All Drives</button>
          </div>
          
          <div className="grid gap-4">
            {drives.map((drive) => (
              <div key={drive.id} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50/50 transition-all group">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors">
                      <Building2 className="text-slate-400 group-hover:text-blue-500" size={24}/>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{drive.company}</h3>
                      <p className="text-sm text-slate-500">{drive.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-slate-800">{drive.package}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Annual CTC</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <Award size={14} className="text-amber-500"/> {drive.eligibility}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <Users size={14} className="text-blue-500"/> 142 Applied
                    </div>
                  </div>
                  <button className="bg-slate-900 text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ALUMNI MENTORS */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
            <GraduationCap className="text-purple-500" size={20}/> Featured Alumni
          </h2>
          {[
            { name: 'Ananya Iyer', company: 'Amazon', role: 'Senior SDE', year: '2018' },
            { name: 'Kunal Verma', company: 'Tesla', role: 'AI Researcher', year: '2019' },
          ].map((alumnus, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full mb-4 border-4 border-white shadow-sm flex items-center justify-center text-white font-bold text-xl">
                {alumnus.name[0]}
              </div>
              <h4 className="font-bold text-slate-900">{alumnus.name}</h4>
              <p className="text-xs text-slate-500 mb-1">{alumnus.role} @ {alumnus.company}</p>
              <p className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full mb-4">Class of {alumnus.year}</p>
              <button className="w-full py-2 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                Connect <ExternalLink size={12}/>
              </button>
            </div>
          ))}
          
          <div className="bg-slate-900 p-6 rounded-3xl text-white">
            <h3 className="font-bold text-lg mb-2">Want to contribute?</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">Alumni can support the campus fund or sign up as student mentors for the 2026 session.</p>
            <button className="w-full py-3 bg-blue-600 rounded-xl text-sm font-bold shadow-lg shadow-blue-900/20">
              Donate to Campus Fund
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementHub;
