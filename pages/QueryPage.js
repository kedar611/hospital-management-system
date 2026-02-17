import React, { useState } from 'react';
import QueryBox from '../components/QueryBox';
import { executeQuery } from '../services/api';

const QueryPage = () => {
  const [sql, setSql] = useState("");
  const [results, setResults] = useState([]);

  const handleRun = async () => {
    try {
      const res = await executeQuery(sql);
      setResults(res.data);
    } catch (err) {
      alert("Error executing query: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <QueryBox query={sql} setQuery={setSql} onRun={handleRun} />
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              {results.length > 0 && Object.keys(results[0]).map(key => (
                <th key={key} className="px-4 py-3 font-bold text-slate-700 capitalize">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((row, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                {Object.values(row).map((val, j) => (
                  <td key={j} className="px-4 py-3 text-slate-600">{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QueryPage;