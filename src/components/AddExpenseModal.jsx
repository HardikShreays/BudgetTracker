import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';

const AddExpenseModal = ({ onClose, onAddExpense, budgets, defaultBudgetId }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [budgetId, setBudgetId] = useState(defaultBudgetId || (budgets.length > 0 ? budgets[0].id : ''));
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState('monthly');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    if (!budgetId) {
      setError('Please select a budget category');
      return;
    }
    
    // Create new expense
    onAddExpense({
      description: description.trim(),
      amount: parseFloat(amount),
      budgetId,
      isRecurring,
      frequency: isRecurring ? frequency : null
    });
    
    // Reset form
    setDescription('');
    setAmount('');
    setBudgetId(defaultBudgetId || '');
    setIsRecurring(false);
    setFrequency('monthly');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Add Expense</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          {error && (
            <div className="mb-4 p-2 bg-red-50 text-red-500 text-sm rounded">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="expense-description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              id="expense-description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Grocery shopping, Netflix subscription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="expense-amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                id="expense-amount"
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="expense-budget" className="block text-sm font-medium text-gray-700 mb-1">
              Budget Category
            </label>
            <select
              id="expense-budget"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={budgetId}
              onChange={(e) => setBudgetId(e.target.value)}
              required
            >
              {budgets.length === 0 ? (
                <option value="" disabled>No budget categories available</option>
              ) : (
                <>
                  <option value="" disabled>Select a category</option>
                  {budgets.map(budget => (
                    <option key={budget.id} value={budget.id}>{budget.name}</option>
                  ))}
                </>
              )}
            </select>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is-recurring"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
              />
              <label htmlFor="is-recurring" className="ml-2 block text-sm text-gray-700">
                Recurring Expense
              </label>
            </div>
          </div>
          
          {isRecurring && (
            <div className="mb-6 pl-6 border-l-2 border-blue-100">
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                Frequency
              </label>
              <select
                id="frequency"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              <p className="mt-1 text-xs text-gray-500 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                You'll receive reminders for this expense
              </p>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-md"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;