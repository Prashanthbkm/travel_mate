import React, { useState } from 'react';
import '../styles/expenseTracker.css';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const addExpense = () => {
    if (!category || !amount) return;
    setExpenses([...expenses, { category, amount: parseFloat(amount), id: Date.now() }]);
    setCategory('');
    setAmount('');
  };

  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="expense-tracker">
      <h2>💰 Expense Tracker</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Category (e.g., Flights, Food)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <h3>Total: ${totalExpense.toFixed(2)}</h3>
      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense.id}>
            <strong>{expense.category}</strong>: ${expense.amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;
