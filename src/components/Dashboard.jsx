import React from 'react';
import { PieChart, BarChart, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import BudgetSummaryChart from './BudgetSummaryChart';

const Dashboard = ({ budgets, expenses }) => {
  // Calculate total budget
  const totalBudget = budgets.reduce((total, budget) => total + parseFloat(budget.amount), 0);
  
  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  
  // Calculate remaining budget
  const remainingBudget = totalBudget - totalExpenses;
  
  // Calculate percentage spent
  const percentageSpent = totalBudget > 0 ? (totalExpenses / totalBudget) * 100 : 0;
  
  // Get color based on percentage spent
  const getStatusColor = (percentage) => {
    if (percentage >= 100) return 'text-red-500';
    if (percentage >= 75) return 'text-amber-500';
    return 'text-green-500';
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Budget Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Budget Card */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-blue-500 font-medium">Total Budget</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(totalBudget)}</p>
              </div>
              <ArrowUpCircle className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          
          {/* Total Expenses Card */}
          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-amber-500 font-medium">Total Expenses</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(totalExpenses)}</p>
              </div>
              <ArrowDownCircle className="h-8 w-8 text-amber-400" />
            </div>
          </div>
          
          {/* Remaining Budget Card */}
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-green-500 font-medium">Remaining</p>
                <p className={`text-2xl font-bold mt-1 ${getStatusColor(percentageSpent)}`}>
                  {formatCurrency(remainingBudget)}
                </p>
              </div>
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-100">
                <span className={`text-lg font-bold ${getStatusColor(percentageSpent)}`}>
                  {Math.round(100 - percentageSpent)}%
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Budget Allocation</h3>
          {budgets.length > 0 ? (
            <div className="h-64">
              <BudgetSummaryChart budgets={budgets} expenses={expenses} />
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <PieChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Add budgets to see your allocation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;