import React from 'react';
import { Play } from 'lucide-react';

const QueryBox = ({ query, setQuery, onRun }) => (
  <div className="bg-slate-900 rounded-xl p-4 shadow-xl">
    <div className="flex justify-between items-center mb-3">
      <span className="text-slate-400 text-xs font-mono uppercase tracking-widest">SQL Editor</span>
      <button 
        onClick={onRun}
        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-md text-sm font-bold transition-all"
      >
        <Play size={14} /> Run Query
      </button>
    </div>
    <textarea 
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="SELECT * FROM patients..."
      className="w-full h-48 bg-transparent text-emerald-400 font-mono focus:outline-none resize-none text-sm"
    />
  </div>
);

export default QueryBox;