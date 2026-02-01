import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  Plus, 
  Search, 
  Filter, 
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';

/**
 * AcademicERP Component
 * * This is a high-density management interface for the Campus ERP.
 * Features:
 * 1. Departmental Analytics
 * 2. Course Catalog Management
 * 3. Enrollment Tracking
 * 4. Performance Grade Distribution
 */

// --- TYPES & INTERFACES ---
interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  department: string;
  enrollmentCount: number;
  status: 'Active' | 'Archived';
}

interface DeptStats {
  name: string;
  students: number;
  avgGpa: number;
  passingRate: number;
}

const AcademicERP: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'enrollments'>('overview');
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock Data for Analytics
  const deptData: DeptStats[] = [
    { name: 'Computer Science', students: 450, avgGpa: 8.4, passingRate: 92 },
    { name: 'Electrical Eng', students: 320, avgGpa: 7.8, passingRate: 88 },
    { name: 'Mechanical Eng', students: 280, avgGpa: 7.2, passingRate: 85 },
    { name: 'Business Admin', students: 510, avgGpa: 8.1, passingRate: 95 },
  ];

  // --- LOGIC HELPER FUNCTIONS ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setCourses([
        { id: '1', code: 'CS101', title: 'Intro to AI', credits: 4, department: 'CS', enrollmentCount: 120, status: 'Active' },
        { id: '2', code: 'EC202', title: 'Digital Electronics', credits: 3, department: 'EE', enrollmentCount: 85, status: 'Active' },
        { id: '3', code: 'MA105', title: 'Discrete Mathematics', credits: 4, department: 'GS', enrollmentCount: 200, status: 'Active' },
      ]);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleEnrollmentExport = () => {
    console.log("Exporting high-density CSV data...");
    // Logic for generating CSV reports for university audits
  };

  // --- RENDER SUB-COMPONENTS ---

  const renderStatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {[
        { label: 'Total Courses', value: '124', icon: BookOpen, color: 'text-blue-600' },
        { label: 'Total Students', value: '1,562', icon: Users, color: 'text-purple-600' },
        { label: 'Avg Campus GPA', value: '7.92', icon: GraduationCap, color: 'text-green-600' },
        { label: 'Active Faculty', value: '88', icon: CheckCircle2, color: 'text-orange-600' },
      ].map((stat, idx) => (
        <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
            <stat.icon size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Academic Management</h1>
          <p className="text-gray-500">Configure courses, departments, and academic standards.</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleEnrollmentExport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <FileText size={18} />
            <span>Reports</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Plus size={18} />
            <span>Add Course</span>
          </button>
        </div>
      </div>

      {renderStatsCards()}

      {/* MAIN CONTENT TABS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4 flex space-x-6">
          {['overview', 'courses', 'enrollments'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`capitalize pb-2 text-sm font-semibold transition-colors ${
                activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Performance Chart */}
              <div className="p-4 border border-gray-50 rounded-lg">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="mr-2 text-blue-500" size={20} />
                  Departmental Passing Rate (%)
                </h4>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={deptData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="passingRate" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* GPA Trends */}
              <div className="p-4 border border-gray-50 rounded-lg">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <AlertCircle className="mr-2 text-orange-500" size={20} />
                  Average GPA by Department
                </h4>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={deptData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="avgGpa" stroke="#10b981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              {/* SEARCH & FILTER BAR */}
              <div className="flex space-x-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by course code or title..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center space-x-2 text-gray-600">
                  <Filter size={18} />
                  <span>Filter</span>
                </button>
              </div>

              {/* DATA TABLE */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-bold">
                      <th className="px-4 py-3">Code</th>
                      <th className="px-4 py-3">Course Title</th>
                      <th className="px-4 py-3">Credits</th>
                      <th className="px-4 py-3">Dept</th>
                      <th className="px-4 py-3">Enrolled</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {courses.map((course) => (
                      <tr key={course.id} className="hover:bg-blue-50/30 transition">
                        <td className="px-4 py-4 font-mono text-sm font-bold text-blue-600">{course.code}</td>
                        <td className="px-4 py-4 text-gray-700 font-medium">{course.title}</td>
                        <td className="px-4 py-4 text-gray-600">{course.credits}</td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 font-bold">{course.department}</span>
                        </td>
                        <td className="px-4 py-4 text-gray-600">{course.enrollmentCount}</td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            {course.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicERP;
