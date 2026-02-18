import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Database, Download, Trash2, Cpu } from 'lucide-react';
import { executeQuery } from '../services/api';

const QueryPage = () => {
  const [sql, setSql] = useState("SELECT * FROM patients LIMIT 10;");
  const [results, setResults] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleRun = async () => {
    setIsExecuting(true);
    try {
      const res = await executeQuery(sql);
      setResults(res.data);
    } catch (err) {
      alert("Execution Error: " + err.message);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">SQL Query Lab</h2>
          <p className="text-slate-500 font-medium">Execute raw SQL queries against the hospital database.</p>
        </div>
        <div className="flex gap-2 text-xs font-bold text-slate-400 bg-slate-100 p-1.5 rounded-lg">
          <span className="flex items-center gap-1"><Cpu size={12}/> Engine: V1.0</span>
        </div>
      </div>

      {/* Code Editor Container */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-slate-900 rounded-[2rem] p-6 shadow-2xl">
          <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            
            {/* --- THE STYLISH RUN BUTTON --- */}
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRun}
              disabled={isExecuting}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-black text-sm shadow-lg transition-all"
            >
              {isExecuting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Play size={16} fill="currentColor" />
              )}
              {isExecuting ? 'EXECUTING...' : 'RUN QUERY'}
            </motion.button>
          </div>

          <textarea 
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            className="w-full h-40 bg-transparent text-emerald-400 font-mono text-sm focus:outline-none resize-none leading-relaxed"
            spellCheck="false"
          />
        </div>
      </div>

      {/* Results Table Section */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Database size={18} className="text-blue-600" />
            <span className="font-bold text-slate-700">Query Results</span>
            <span className="ml-2 text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-black uppercase">
              {results.length} Rows
            </span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Download size={18}/></button>
            <button onClick={() => setResults([])} className="p-2 text-slate-400 hover:text-rose-600 transition-colors"><Trash2 size={18}/></button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {results.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  {Object.keys(results[0]).map(key => (
                    <th key={key} className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((row, i) => (
                  <tr key={i} className="hover:bg-blue-50/30 transition-colors group">
                    {Object.values(row).map((val, j) => (
                      <td key={j} className="px-8 py-4 text-sm font-medium text-slate-600 border-b border-slate-50 group-last:border-0">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-20 text-center flex flex-col items-center gap-4">
              <div className="p-4 bg-slate-50 rounded-full text-slate-300">
                <Database size={40} />
              </div>
              <p className="text-slate-400 font-medium">No data to display. Run a query to fetch records.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueryPage;
