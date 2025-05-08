import React from 'react';
import { DollarSign, Plus } from 'lucide-react';

const Header = ({ onAddBudgetClick, onAddExpenseClick, onPageChange, currentPage }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <DollarSign className="h-8 w-8 text-blue-500 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Budget Tracker</h1>
          </div>
          
          <nav className="flex items-center space-x-6 mb-4 sm:mb-0">
            <button
              onClick={() => onPageChange('home')}
              className={`text-sm font-medium ${currentPage === 'home' ? 'text-blue-500' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Home
            </button>
            <button
              onClick={() => onPageChange('about')}
              className={`text-sm font-medium ${currentPage === 'about' ? 'text-blue-500' : 'text-gray-600 hover:text-gray-900'}`}
            >
              About
            </button>
            <button
              onClick={() => onPageChange('contact')}
              className={`text-sm font-medium ${currentPage === 'contact' ? 'text-blue-500' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Contact
            </button>
          </nav>
          
          <div className="flex space-x-3">
            <button
              onClick={onAddBudgetClick}
              className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 transition duration-150 ease-in-out"
            >
              <Plus className="h-4 w-4 mr-1" />
              New Budget
            </button>
            
            <button
              onClick={onAddExpenseClick}
              className="inline-flex items-center px-4 py-2 bg-green-500 border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-green-600 active:bg-green-700 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 transition duration-150 ease-in-out"
            >
              <Plus className="h-4 w-4 mr-1" />
              New Expense
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;