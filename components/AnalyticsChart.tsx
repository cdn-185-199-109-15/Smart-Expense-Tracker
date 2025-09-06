
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Expense, ExpenseCategory } from '../types';
import { CATEGORY_COLORS } from '../constants';

interface AnalyticsChartProps {
  expenses: Expense[];
}

interface ChartData {
    name: ExpenseCategory;
    value: number;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ expenses }) => {
  const chartData = useMemo<ChartData[]>(() => {
    if (expenses.length === 0) return [];
    
    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<ExpenseCategory, number>);

    return Object.entries(categoryTotals)
        .map(([name, value]) => ({
            name: name as ExpenseCategory,
            value: value,
        }))
        .sort((a, b) => b.value - a.value);

  }, [expenses]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Expense Analytics</h2>
      <div className="w-full h-80">
        {expenses.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
            <div className="flex items-center justify-center h-full">
                <p className="text-slate-500">Add some expenses to see your analytics chart.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsChart;
