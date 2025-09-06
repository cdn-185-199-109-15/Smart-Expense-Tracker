
import React from 'react';
import { Expense } from '../types';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../constants';

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseListItem: React.FC<{ expense: Expense }> = ({ expense }) => {
    const iconColor = CATEGORY_COLORS[expense.category] || "#9CA3AF";
    const iconBgClass = `bg-[${iconColor}]/20`;

    return (
        <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center space-x-4">
                <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${iconColor}20`}} // bg-opacity-20
                >
                    <span style={{ color: iconColor }}>{CATEGORY_ICONS[expense.category]}</span>
                </div>
                <div>
                    <p className="font-semibold text-slate-800">{expense.description}</p>
                    <p className="text-sm text-slate-500">{expense.date.toLocaleDateString()}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-lg font-bold text-slate-900">${expense.amount.toFixed(2)}</p>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ color: iconColor, backgroundColor: `${iconColor}20` }}>
                    {expense.category}
                </span>
            </div>
        </li>
    );
};

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Recent Expenses</h2>
      {expenses.length === 0 ? (
        <p className="text-center text-slate-500 py-8">No expenses added yet. Start tracking!</p>
      ) : (
        <ul className="space-y-3">
          {expenses.map((expense) => (
            <ExpenseListItem key={expense.id} expense={expense} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
