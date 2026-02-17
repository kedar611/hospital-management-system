import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
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
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800">Data Importer</h2>
        <p className="text-slate-500 mt-2">Upload hospital records (CSV or SQL) to populate the database.</p>
      </div>

      <div className={`border-2 border-dashed rounded-3xl p-12 transition-all text-center ${
        file ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-white hover:border-blue-400'
      }`}>
        <input 
          type="file" 
          id="fileInput" 
          className="hidden" 
          onChange={(e) => setFile(e.target.files[0])}
          accept=".csv,.sql"
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          <Upload className={`mx-auto h-16 w-16 mb-4 ${file ? 'text-blue-600' : 'text-slate-400'}`} />
          <span className="text-lg font-semibold block text-slate-700">
            {file ? file.name : "Click to select a file"}
          </span>
          <span className="text-sm text-slate-500">Supports .CSV and .SQL formats</span>
        </label>
      </div>

      {file && status !== 'success' && (
        <button 
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
        >
          {status === 'uploading' ? 'Processing...' : 'Confirm Upload'}
        </button>
      )}

      {status === 'success' && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl">
          <CheckCircle size={20} />
          <span className="font-medium">Dataset imported successfully! You can now query it in the SQL Lab.</span>
        </div>
      )}
    </div>
  );
};

export default UploadPage;