import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Upload, Activity, Bell, Search, Zap, Heart, Shield } from 'lucide-react';
import QueryPage from './pages/QueryPage';
import UploadPage from './pages/UploadPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('query');

  return (
    <div className="flex h-screen w-full overflow-hidden p-4 md:p-6 bg-transparent">
      
      {/* --- Sidebar (Floating Glass Design) --- */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-72 glass-panel rounded-[2.5rem] flex flex-col p-8 mr-6 hidden lg:flex"
      >
        <div className="flex items-center gap-3 mb-16">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-lg opacity-40 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-xl">
              <Activity className="text-white" size={24} />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">Medi<span className="text-blue-600">Pro</span></span>
        </div>

        <nav className="flex-1 space-y-4">
          {[
            { id: 'upload', label: 'Import Centre', icon: Upload, color: 'text-amber-500' },
            { id: 'query', label: 'Query Engine', icon: Database, color: 'text-blue-500' },
          ].map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                activeTab === item.id 
                ? 'bg-white text-blue-600 shadow-xl' 
                : 'text-slate-500 hover:bg-white/50'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-blue-600' : item.color} />
              {item.label}
            </motion.button>
          ))}
        </nav>

        {/* User Profile Card */}
        <div className="mt-auto bg-slate-900 rounded-3xl p-5 text-white flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center font-bold">A</div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-400">Database Admin</p>
            <p className="text-sm font-bold">Admin User</p>
          </div>
        </div>
      </motion.aside>

      {/* --- Content Area --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header with Search and Stats */}
        <header className="flex items-center justify-between mb-8 px-4">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search records, queries, doctors..." 
              className="w-full bg-white/50 backdrop-blur-md border border-white rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-4 mr-4">
               <div className="flex items-center gap-2 text-slate-500 text-xs font-bold"><Heart size={14} className="text-rose-500"/> Vital Sync</div>
               <div className="flex items-center gap-2 text-slate-500 text-xs font-bold"><Shield size={14} className="text-emerald-500"/> Secure</div>
            </div>
            <button className="relative p-3 bg-white rounded-2xl shadow-sm text-slate-400"><Bell size={20}/><span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span></button>
          </div>
        </header>

        {/* Content Island */}
        <motion.div 
          layout
          className="flex-1 glass-panel rounded-[3rem] overflow-hidden flex flex-col border border-white/40 shadow-2xl"
        >
          <div className="flex-1 overflow-y-auto p-10 custom-scrollbar relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <Zap size={300} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 h-full"
              >
                {activeTab === 'query' ? <QueryPage /> : <UploadPage />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
