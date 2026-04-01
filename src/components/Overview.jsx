import React from 'react';

const cardClass = "bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-300";

export default function Overview({ balance, totalIncome, totalExpense, categoryBreakdown, highestCategory }) {
  return (
    <>
   
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className={`${cardClass} hover:-translate-y-1`}>
          <h3 className="text-slate-500 dark:text-slate-400 font-medium mb-4 uppercase text-xs tracking-wider">Total Balance</h3>
          <p className={`text-4xl font-extrabold tracking-tight ${balance >= 0 ? 'text-slate-900 dark:text-white' : 'text-rose-600 dark:text-rose-400'}`}>
            ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className={`${cardClass} hover:-translate-y-1`}>
          <h3 className="text-slate-500 dark:text-slate-400 font-medium mb-4 uppercase text-xs tracking-wider">Income</h3>
          <p className="text-4xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400">
            ${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className={`${cardClass} hover:-translate-y-1`}>
          <h3 className="text-slate-500 dark:text-slate-400 font-medium mb-4 uppercase text-xs tracking-wider">Expenses</h3>
          <p className="text-4xl font-extrabold tracking-tight text-rose-600 dark:text-rose-400">
            ${totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className={cardClass}>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Spending Breakdown</h3>
          <div className="space-y-6">
            {Object.entries(categoryBreakdown).sort((a,b) => b[1] - a[1]).map(([category, amount]) => {
              const percentage = totalExpense > 0 ? ((amount / totalExpense) * 100).toFixed(0) : 0;
              return (
                <div key={category} className="group">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{category}</span>
                    <span className="text-slate-500 dark:text-slate-400 font-medium">${amount.toLocaleString()} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div className="bg-indigo-500 dark:bg-indigo-400 h-3 rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 rounded-2xl shadow-sm border border-indigo-100 dark:border-indigo-800/30">
          <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-6">Smart Insights</h3>
          <ul className="space-y-4">
            <li className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl shadow-sm border border-white/40 dark:border-slate-700/50 flex gap-3 items-center">
              <span className="text-2xl">🎯</span>
              <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Top category: <strong className="text-indigo-700 dark:text-indigo-400">{highestCategory.name}</strong> (${highestCategory.amount.toLocaleString()}).</span>
            </li>
            <li className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl shadow-sm border border-white/40 dark:border-slate-700/50 flex gap-3 items-center">
              <span className="text-2xl">{totalExpense > totalIncome ? '⚠️' : '✅'}</span>
              <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{totalExpense > totalIncome ? "Deficit warning: Expenses exceed income." : "Healthy budget: Operating in a surplus."}</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}