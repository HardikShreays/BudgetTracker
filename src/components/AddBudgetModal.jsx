import React, { useState } from 'react';
import { X } from 'lucide-react';

const colorOptions = [
  { label: 'Blue', value: '#3B82F6' },
  { label: 'Green', value: '#10B981' },
  { label: 'Purple', value: '#8B5CF6' },
  { label: 'Pink', value: '#EC4899' },
  { label: 'Yellow', value: '#F59E0B' },
  { label: 'Red', value: '#EF4444' },
  { label: 'Indigo', value: '#6366F1' },
  { label: 'Teal', value: '#14B8A6' },
];

const AddBudgetModal = ({ onClose, onAddBudget }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [color, setColor] = useState('#3B82F6');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name.trim()) {
      setError('Please enter a budget name');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    // Create new budget
    onAddBudget({
      name: name.trim(),
      amount: parseFloat(amount),
      color
    });
    
    // Reset form
    setName('');
    setAmount('');
    setColor('#3B82F6');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Create Budget</h2>
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
            <label htmlFor="budget-name" className="block text-sm font-medium text-gray-700 mb-1">
              Budget Name
            </label>
            <input
              type="text"
              id="budget-name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Groceries, Rent, Entertainment"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="budget-amount" className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                id="budget-amount"
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
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {colorOptions.map((option) => (
                <div 
                  key={option.value}
                  className={`w-full h-8 rounded-md cursor-pointer border-2 ${color === option.value ? 'border-gray-800' : 'border-transparent'}`}
                  style={{ backgroundColor: option.value }}
                  onClick={() => setColor(option.value)}
                  title={option.label}
                ></div>
              ))}
            </div>
          </div>
          
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
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md"
              data-add-budget
            >
              Add Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBudgetModal;