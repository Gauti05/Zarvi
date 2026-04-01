import React from 'react';

export default function TransactionTable({ 
  role, transactions, handleDelete, handleAdd,
  searchTerm, setSearchTerm, filterType, setFilterType, sortBy, setSortBy 
}) {
  return (
    <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex flex-col xl:flex-row justify-between xl:items-center mb-6 gap-4 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Ledger History</h2>
          {role === 'admin' && (
            <button onClick={handleAdd} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg font-medium shadow-sm">
              + Add Mock Data
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3">
          <input 
            type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm cursor-pointer">
            <option value="All">All Types</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm cursor-pointer">
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100 dark:border-slate-700/50">
              <th className="pb-4 font-semibold px-4">Date</th>
              <th className="pb-4 font-semibold px-4">Description</th>
              <th className="pb-4 font-semibold px-4">Category</th>
              <th className="pb-4 font-semibold px-4 text-right">Amount</th>
              {role === 'admin' && <th className="pb-4 font-semibold px-4 text-right">Action</th>}
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr><td colSpan={role === 'admin' ? "5" : "4"} className="text-center py-12 text-slate-400">No transactions found.</td></tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id} className="group border-b border-slate-50 dark:border-slate-700/30 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="py-4 px-4 text-sm text-slate-500 dark:text-slate-400 font-medium">{tx.date}</td>
                  <td className="py-4 px-4 font-bold text-slate-800 dark:text-slate-200">{tx.desc}</td>
                  <td className="py-4 px-4"><span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-semibold">{tx.category}</span></td>
                  <td className="py-4 px-4 text-right">
                    <span className={`font-bold ${tx.type === 'Income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                      {tx.type === 'Income' ? '+' : '-'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  {role === 'admin' && (
                    <td className="py-4 px-4 text-right opacity-0 group-hover:opacity-100">
                      <button onClick={() => handleDelete(tx.id)} className="text-rose-500 hover:text-rose-600 font-medium text-sm">Delete</button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}