import React, { useState, useMemo, useEffect } from 'react';
import { initialTransactions } from './data';
import Header from './components/Header';
import Overview from './components/Overview';
import TransactionTable from './components/TransactionTable';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState('viewer');
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setTimeout(() => {
        const savedData = localStorage.getItem('finance-data');
        setTransactions(savedData ? JSON.parse(savedData) : initialTransactions);
        setIsLoading(false);
      }, 1000);
    };
    loadData();
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setIsDarkMode(true);
  }, []);

  useEffect(() => {
    if (!isLoading) localStorage.setItem('finance-data', JSON.stringify(transactions));
  }, [transactions, isLoading]);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);


  const { totalIncome, totalExpense, balance, categoryBreakdown, highestCategory } = useMemo(() => {
    let income = 0; let expense = 0;
    const categories = {};
    transactions.forEach(t => {
      if (t.type === 'Income') income += t.amount;
      else {
        expense += t.amount;
        categories[t.category] = (categories[t.category] || 0) + t.amount;
      }
    });
    let highestCat = { name: 'None', amount: 0 };
    Object.entries(categories).forEach(([name, amount]) => {
      if (amount > highestCat.amount) highestCat = { name, amount };
    });
    return { totalIncome: income, totalExpense: expense, balance: income - expense, categoryBreakdown: categories, highestCategory: highestCat };
  }, [transactions]);

 
  const processedTransactions = useMemo(() => {
    let filtered = transactions.filter(t => {
      const matchesSearch = t.desc.toLowerCase().includes(searchTerm.toLowerCase()) || t.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || t.type === filterType;
      return matchesSearch && matchesType;
    });
    return filtered.sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'amount-desc') return b.amount - a.amount;
      if (sortBy === 'amount-asc') return a.amount - b.amount;
      return 0;
    });
  }, [transactions, searchTerm, filterType, sortBy]);

  
  const handleDelete = (id) => setTransactions(transactions.filter(t => t.id !== id));
  const handleAddMockTransaction = () => {
    const newTx = { id: Date.now(), date: new Date().toISOString().split('T')[0], amount: Math.floor(Math.random() * 200) + 10, category: 'Misc', type: 'Expense', desc: 'Admin Added Expense' };
    setTransactions([newTx, ...transactions]);
  };
  const exportCSV = () => {  };
  const exportJSON = () => {  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans transition-colors duration-500 selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <Header 
          role={role} setRole={setRole} 
          isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} 
          exportCSV={exportCSV} exportJSON={exportJSON} 
        />
        <Overview 
          balance={balance} totalIncome={totalIncome} totalExpense={totalExpense} 
          categoryBreakdown={categoryBreakdown} highestCategory={highestCategory} 
        />
        <TransactionTable 
          role={role} transactions={processedTransactions} 
          handleDelete={handleDelete} handleAdd={handleAddMockTransaction}
          searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
          filterType={filterType} setFilterType={setFilterType} 
          sortBy={sortBy} setSortBy={setSortBy} 
        />
      </div>
    </div>
  );
}