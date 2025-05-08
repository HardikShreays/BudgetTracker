import React, { useState } from 'react';
import { Search, Trash2, Calendar } from 'lucide-react';

const ExpenseList = ({ expenses, budgets, onDeleteExpense }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  // Find budget name by ID
  const getBudgetName = (budgetId) => {
    const budget = budgets.find(b => b.id === budgetId);
    return budget ? budget.name : 'Unknown';
  };

  // Get budget color by ID
  const getBudgetColor = (budgetId) => {
    const budget = budgets.find(b => b.id === budgetId);
    return budget?.color || '#3B82F6';
  };
  
  // Filter expenses by search term
  const filteredExpenses = expenses.filter(expense => 
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getBudgetName(expense.budgetId).toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort expenses
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === 'amount') {
      return sortOrder === 'asc' 
        ? parseFloat(a.amount) - parseFloat(b.amount)
        : parseFloat(b.amount) - parseFloat(a.amount);
    } else if (sortBy === 'date') {
      return sortOrder === 'asc'
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    } else {
      return sortOrder === 'asc'
        ? a.description.localeCompare(b.description)
        : b.description.localeCompare(a.description);
    }
  });
  
  // Toggle sort order
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <p className="text-gray-500">No expenses recorded yet. Start tracking your spending!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search expenses..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => toggleSort('description')}
              >
                Description {sortBy === 'description' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => toggleSort('amount')}
              >
                Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => toggleSort('date')}
              >
                Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedExpenses.map(expense => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{expense.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-medium">{formatCurrency(expense.amount)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    className="px-2 py-1 text-xs rounded-full"
                    style={{ 
                      backgroundColor: `${getBudgetColor(expense.budgetId)}20`,
                      color: getBudgetColor(expense.budgetId)
                    }}
                  >
                    {getBudgetName(expense.budgetId)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1 inline" />
                    {formatDate(expense.date)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => onDeleteExpense(expense.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {sortedExpenses.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No expenses match your search.
        </div>
      )}
    </div>
  );
};

export default ExpenseList;