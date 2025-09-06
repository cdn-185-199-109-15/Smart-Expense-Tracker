
import React, { useState, useCallback } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import AnalyticsChart from './components/AnalyticsChart';
import { categorizeExpense } from './services/geminiService';
import { Expense, ExpenseCategory } from './types';

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', description: 'Groceries from Walmart', amount: 75.50, category: ExpenseCategory.Food, date: new Date() },
    { id: '2', description: 'Monthly bus pass', amount: 60.00, category: ExpenseCategory.Transport, date: new Date() },
    { id: '3', description: 'Movie tickets', amount: 25.00, category: ExpenseCategory.Entertainment, date: new Date() },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddExpense = useCallback(async (description: string, amount: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const category = await categorizeExpense(description);
      const newExpense: Expense = {
        id: new Date().toISOString(),
        description,
        amount,
        category,
        date: new Date(),
      };
      setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
    } catch (err) {
      setError('Failed to categorize expense. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-3">
                <svg className="h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 4h4m2 5a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className="text-3xl font-bold leading-tight text-slate-900">
                  Smart Expense Tracker
                </h1>
            </div>
            <p className="mt-1 text-slate-500">Your intelligent financial companion, powered by Sha.</p>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ExpenseForm onAddExpense={handleAddExpense} isLoading={isLoading} />
            </div>
            <div className="lg:col-span-2">
              <AnalyticsChart expenses={expenses} />
            </div>
          </div>
          <div className="mt-8">
            <ExpenseList expenses={expenses} />
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>Built with React, TypeScript, Tailwind CSS, and Gemini API.</p>
      </footer>
    </div>
  );
};

export default App;
