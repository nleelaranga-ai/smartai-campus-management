import React, { useState } from 'react';
import { Search, Book as BookIcon, Clock, ShieldCheck, MapPin, Download } from 'lucide-react';

const LibraryManagement: React.FC = () => {
  const [books, setBooks] = useState([
    { id: 1, title: "Neural Networks & Deep Learning", author: "Michael Nielsen", category: "AI", status: "Available", rack: "A-102" },
    { id: 2, title: "Modern Operating Systems", author: "Andrew Tanenbaum", category: "CS", status: "Issued", rack: "B-205" },
    { id: 3, title: "Clean Code", author: "Robert C. Martin", category: "Software", status: "Available", rack: "C-110" },
  ]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Digital Library</h1>
          <p className="text-gray-500">Access over 10,000+ academic resources and journals.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-xs text-gray-400 font-bold uppercase">Active Loans</p>
              <p className="text-xl font-bold text-blue-600">04</p>
           </div>
           <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-xs text-gray-400 font-bold uppercase">Overdue Fine</p>
              <p className="text-xl font-bold text-red-500">₹45.00</p>
           </div>
        </div>
      </div>

      {/* SEARCH FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by title, author, or ISBN..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select className="bg-gray-50 border-none rounded-lg px-4 py-2.5 text-gray-600 font-medium">
          <option>All Categories</option>
          <option>Artificial Intelligence</option>
          <option>Database Systems</option>
          <option>Mathematics</option>
        </select>
      </div>

      {/* BOOK GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <BookIcon size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                book.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {book.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">{book.title}</h3>
            <p className="text-sm text-gray-500 mb-4">By {book.author}</p>
            
            <div className="space-y-2 border-t border-gray-50 pt-4 mb-6">
              <div className="flex items-center text-sm text-gray-600 gap-2">
                <MapPin size={14} className="text-gray-400"/>
                <span>Rack Location: <span className="font-bold">{book.rack}</span></span>
              </div>
              <div className="flex items-center text-sm text-gray-600 gap-2">
                <ShieldCheck size={14} className="text-gray-400"/>
                <span>Category: {book.category}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                Reserve Book
              </button>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Download size={18} className="text-gray-600"/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryManagement;
