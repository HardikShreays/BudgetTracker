import React from 'react';
import BudgetCard from './BudgetCard';

const BudgetCategoryList = ({ budgets, getBudgetExpenses, onAddExpenseClick, onDeleteBudget }) => {
  if (budgets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <p className="text-gray-500 mb-4">No budget categories yet. Create your first budget to get started!</p>
        <button
          onClick={() => document.querySelector("[data-add-budget]").click()}
          className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 transition duration-150 ease-in-out"
        >
          Create Budget
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {budgets.map(budget => {
        const expenses = getBudgetExpenses(budget.id);
        const totalSpent = expenses.reduce(
          (total, expense) => total + parseFloat(expense.amount), 0
        );
        
        return (
          <BudgetCard
            key={budget.id}
            budget={budget}
            spent={totalSpent}
            onAddExpenseClick={() => onAddExpenseClick(budget.id)}
            onDeleteBudget={() => onDeleteBudget(budget.id)}
          />
        );
      })}
    </div>
  );
};

export default BudgetCategoryList;