import React from 'react';

export default function Header({ role, setRole, isDarkMode, setIsDarkMode, exportCSV, exportJSON }) {
  return (
    <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Financial Overview</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Real-time mock environment with persistence.</p>
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>

        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Role:</span>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="bg-transparent font-bold text-indigo-600 dark:text-indigo-400 focus:outline-none cursor-pointer uppercase text-sm"
          >
            <option value="viewer" className="dark:bg-slate-800">Viewer</option>
            <option value="admin" className="dark:bg-slate-800">Admin</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button onClick={exportCSV} className="px-4 py-2 text-sm font-medium bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 rounded-xl hover:opacity-90 shadow-sm">CSV</button>
          <button onClick={exportJSON} className="px-4 py-2 text-sm font-medium bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 rounded-xl hover:opacity-90 shadow-sm">JSON</button>
        </div>
      </div>
    </header>
  );
}