import React, { useState } from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import { uploadDataset } from '../services/api';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, uploading, success, error

  const handleUpload = async () => {
    if (!file) return;
    setStatus('uploading');
    try {
      await uploadDataset(file);
      setStatus('success');
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-10">
      <div className="text-center">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Data Importer</h2>
        <p className="text-slate-500 mt-3 text-lg">
          Upload hospital records (CSV or SQL) to populate the database.
        </p>
      </div>

      <div className={`group border-4 border-dashed rounded-[3rem] p-16 transition-all duration-500 text-center ${
        file ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
      }`}>
        <input 
          type="file" 
          id="fileInput" 
          className="hidden" 
          onChange={(e) => {
            setFile(e.target.files[0]);
            setStatus('idle');
          }}
          accept=".csv,.sql"
        />
        <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center">
          <div className={`p-6 rounded-3xl mb-6 transition-all duration-500 ${file ? 'bg-blue-600 text-white shadow-2xl shadow-blue-200' : 'bg-slate-100 text-slate-400 group-hover:scale-110'}`}>
            <Upload size={48} />
          </div>
          <span className="text-2xl font-bold block text-slate-800 mb-2">
            {file ? file.name : "Drop your file here"}
          </span>
          <span className="text-slate-400 font-medium italic">Supports .CSV and .SQL formats</span>
        </label>
      </div>

      {file && status !== 'success' && (
        <button 
          onClick={handleUpload}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 rounded-[2rem] font-black text-xl hover:shadow-2xl hover:shadow-blue-300 hover:-translate-y-1 transition-all active:scale-95"
        >
          {status === 'uploading' ? 'Processing Records...' : 'Confirm and Sync Data'}
        </button>
      )}

      {status === 'success' && (
        <div className="flex items-center justify-center gap-4 p-6 bg-emerald-50 border-2 border-emerald-100 text-emerald-700 rounded-[2rem] animate-bounce">
          <CheckCircle size={28} />
          <span className="font-bold text-lg text-center">Dataset imported successfully! Check the SQL Lab.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="p-6 bg-rose-50 border-2 border-rose-100 text-rose-700 rounded-[2rem] text-center font-bold">
          Upload failed. Please check your network or backend connection.
        </div>
      )}
    </div>
  );
};

export default UploadPage;
