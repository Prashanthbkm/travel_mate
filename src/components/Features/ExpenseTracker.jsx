import React, { useState, useEffect } from 'react';
import { expenseAPI } from '../../api';
import '../styles/expenseTracker.css';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load expenses on component mount
  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const response = await expenseAPI.getAll();
      setExpenses(response.data);
    } catch (error) {
      console.error('Error loading expenses:', error);
      // Fallback to empty array if backend is not available
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async () => {
    if (!category.trim() || !amount) return;

    try {
      setSaving(true);
      const newExpense = {
        category: category.trim(),
        amount: parseFloat(amount),
        createdAt: new Date().toISOString()
      };

      const response = await expenseAPI.create(newExpense);
      setExpenses(prev => [...prev, response.data]);
      
      setCategory('');
      setAmount('');
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await expenseAPI.delete(id);
      setExpenses(prev => prev.filter(expense => expense.id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense. Please try again.');
    }
  };

  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  if (loading) {
    return (
      <div className="expense-tracker">
        <h2>💰 Expense Tracker</h2>
        <div className="loading">Loading expenses...</div>
      </div>
    );
  }

  return (
    <div className="expense-tracker">
      <h2>💰 Expense Tracker</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Category (e.g., Flights, Food)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addExpense()}
        />
        <input
          type="number"
          placeholder="Amount"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addExpense()}
        />
        <button onClick={addExpense} disabled={saving}>
          {saving ? 'Adding...' : 'Add Expense'}
        </button>
      </div>
      <h3>Total: ${totalExpense.toFixed(2)}</h3>
      <ul className="expense-list">
        {expenses.length === 0 ? (
          <li className="empty">No expenses yet. Add your first expense!</li>
        ) : (
          expenses.map((expense) => (
            <li key={expense.id}>
              <div>
                <strong>{expense.category}</strong>
                <span className="date">
                  {new Date(expense.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span>${expense.amount.toFixed(2)}</span>
                <button 
                  onClick={() => deleteExpense(expense.id)}
                  className="delete-btn"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ExpenseTracker;