import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import BudgetCategoryList from './components/BudgetCategoryList';
import ExpenseList from './components/ExpenseList';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import AlertBanner from './components/AlertBanner';
import About from './components/About';
import Contact from './components/Contact';
import { loadFromLocalStorage, saveToLocalStorage } from './utils/storage';

function App() {
  const [budgets, setBudgets] = useState(loadFromLocalStorage('budgets') || []);
  const [expenses, setExpenses] = useState(loadFromLocalStorage('expenses') || []);
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    saveToLocalStorage('budgets', budgets);
  }, [budgets]);

  useEffect(() => {
    saveToLocalStorage('expenses', expenses);
    checkBudgetAlerts();
  }, [expenses]);

  const addBudget = (newBudget) => {
    const budgetWithId = { 
      ...newBudget, 
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setBudgets([...budgets, budgetWithId]);
    setShowAddBudgetModal(false);
  };

  const addExpense = (newExpense) => {
    const expenseWithId = {
      ...newExpense,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    setExpenses([...expenses, expenseWithId]);
    setShowAddExpenseModal(false);
  };

  const openAddExpenseModal = (budgetId = null) => {
    setSelectedBudgetId(budgetId);
    setShowAddExpenseModal(true);
  };

  const deleteExpense = (expenseId) => {
    setExpenses(expenses.filter(expense => expense.id !== expenseId));
  };

  const deleteBudget = (budgetId) => {
    setBudgets(budgets.filter(budget => budget.id !== budgetId));
  };

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter(expense => expense.budgetId === budgetId);
  };

  const checkBudgetAlerts = () => {
    const newAlerts = [];
    
    budgets.forEach(budget => {
      const budgetExpenses = getBudgetExpenses(budget.id);
      const totalSpent = budgetExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
      const budgetAmount = parseFloat(budget.amount);
      
      if (totalSpent > budgetAmount) {
        newAlerts.push({
          id: Date.now().toString() + budget.id,
          type: 'error',
          message: `Budget exceeded for ${budget.name}`,
          budgetId: budget.id
        });
      } else if (totalSpent > budgetAmount * 0.9) {
        newAlerts.push({
          id: Date.now().toString() + budget.id,
          type: 'warning',
          message: `Nearly at budget limit for ${budget.name}`,
          budgetId: budget.id
        });
      }
    });
    
    if (newAlerts.length > 0) {
      setAlerts(newAlerts);
    }
  };

  const dismissAlert = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <>
            <Dashboard budgets={budgets} expenses={expenses} />
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Budget Categories</h2>
              <BudgetCategoryList 
                budgets={budgets} 
                getBudgetExpenses={getBudgetExpenses}
                onAddExpenseClick={openAddExpenseModal}
                onDeleteBudget={deleteBudget}
              />
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
              <ExpenseList 
                expenses={expenses} 
                budgets={budgets}
                onDeleteExpense={deleteExpense}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header 
        onAddBudgetClick={() => setShowAddBudgetModal(true)}
        onAddExpenseClick={() => openAddExpenseModal()}
        onPageChange={setCurrentPage}
        currentPage={currentPage}
      />
      
      {alerts.length > 0 && (
        <div className="container mx-auto px-4 mt-4">
          {alerts.map(alert => (
            <AlertBanner 
              key={alert.id}
              alert={alert}
              onDismiss={() => dismissAlert(alert.id)}
            />
          ))}
        </div>
      )}
      
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      
      {showAddBudgetModal && (
        <AddBudgetModal 
          onClose={() => setShowAddBudgetModal(false)} 
          onAddBudget={addBudget} 
        />
      )}
      
      {showAddExpenseModal && (
        <AddExpenseModal 
          onClose={() => setShowAddExpenseModal(false)} 
          onAddExpense={addExpense}
          budgets={budgets}
          defaultBudgetId={selectedBudgetId}
        />
      )}
    </div>
  );
}

export default App;