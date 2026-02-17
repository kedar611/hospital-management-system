import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Fixes 'motion' is not defined
import { LayoutDashboard, Database, Upload, Activity } from 'lucide-react';
import QueryPage from './pages/QueryPage';   // Fixes 'QueryPage' is not defined
import UploadPage from './pages/UploadPage'; // Fixes 'UploadPage' is not defined

function App() {
  const [activeTab, setActiveTab] = useState('query'); // Fixes 'activeTab' is not defined

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10">
          <Activity className="text-blue-600" size={28} />
          <span className="text-xl font-bold text-slate-800">MediDB</span>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('upload')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'upload' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <Upload size={18} /> Upload Data
          </button>
          <button
            onClick={() => setActiveTab('query')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'query' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <Database size={18} /> SQL Lab
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'query' && <QueryPage />}
            {activeTab === 'upload' && <UploadPage />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App; // Fixes 'export default not found'