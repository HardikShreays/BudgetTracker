import React from 'react';
import { Trash2, PlusCircle } from 'lucide-react';

const BudgetCard = ({ budget, spent, onAddExpenseClick, onDeleteBudget }) => {
  const { name, amount, color = '#3B82F6' } = budget;
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };
  
  // Calculate percentage spent
  const amountValue = parseFloat(amount);
  const percentSpent = amountValue === 0 ? 0 : (spent / amountValue) * 100;
  
  // Determine progress bar color based on percentage spent
  const getProgressColor = (percent) => {
    if (percent >= 100) return 'bg-red-500';
    if (percent >= 75) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-gray-800">{name}</h3>
          <div className="flex space-x-2">
            <button 
              onClick={onAddExpenseClick}
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
              title="Add expense"
            >
              <PlusCircle className="h-5 w-5" />
            </button>
            <button 
              onClick={onDeleteBudget}
              className="text-gray-400 hover:text-red-500 focus:outline-none"
              title="Delete budget"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-baseline mb-2">
          <div className="text-2xl font-bold" style={{ color }}>
            {formatCurrency(spent)}
          </div>
          <div className="text-sm text-gray-500">
            of {formatCurrency(amount)}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
          <div 
            className={`h-2.5 rounded-full ${getProgressColor(percentSpent)}`}
            style={{ width: `${Math.min(100, percentSpent)}%` }}
          ></div>
        </div>
        
        <div className="text-xs text-right text-gray-500">
          {Math.round(percentSpent)}% spent
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;