import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signup } from '../api';
// import your API helper

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await signup(form);
      alert('Signup successful! Please login.');
      console.log('Signup Response:', data);
      // Optionally reset form or redirect to login
      setForm({ username: '', email: '', password: '' });
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Signup failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'linear-gradient(to bottom, #f0f4f8, #e0f2fe)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50, rotateX: -20 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '30px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 12px 24px -8px rgba(0, 0, 0, 0.15), 0 8px 8px -4px rgba(0, 0, 0, 0.08)',
          borderRadius: '16px',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          perspective: '1000px',
        }}
      >
        <motion.h2
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '30px',
            color: '#1e293b',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.08)',
            transform: 'rotateY(10deg)',
            transition: 'transform 0.5s ease',
          }}
          whileHover={{ rotateY: '0deg' }}
        >
          Sign Up
        </motion.h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="username" style={{ display: 'block', fontSize: '18px', fontWeight: '600', color: '#334155', marginBottom: '10px' }}>
              Username
            </label>
            <motion.input
              type="text"
              id="username"
              value={form.username}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '14px',
                marginTop: '8px',
                border: '2px solid #d1d5db',
                borderRadius: '10px',
                fontSize: '18px',
                transition: 'all 0.3s ease',
                outline: 'none',
                backgroundColor: '#f9fafb',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
              }}
              placeholder="Choose a username"
              whileFocus={{
                borderColor: '#4f46e5',
                boxShadow: '0 0 0 4px rgba(79, 70, 229, 0.1)',
              }}
              whileHover={{
                backgroundColor: '#f3f4f6',
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="email" style={{ display: 'block', fontSize: '18px', fontWeight: '600', color: '#334155', marginBottom: '10px' }}>
              Email
            </label>
            <motion.input
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '14px',
                marginTop: '8px',
                border: '2px solid #d1d5db',
                borderRadius: '10px',
                fontSize: '18px',
                transition: 'all 0.3s ease',
                outline: 'none',
                backgroundColor: '#f9fafb',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
              }}
              placeholder="Enter your email"
              whileFocus={{
                borderColor: '#4f46e5',
                boxShadow: '0 0 0 4px rgba(79, 70, 229, 0.1)',
              }}
              whileHover={{
                backgroundColor: '#f3f4f6',
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label htmlFor="password" style={{ display: 'block', fontSize: '18px', fontWeight: '600', color: '#334155', marginBottom: '10px' }}>
              Password
            </label>
            <motion.input
              type="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '14px',
                marginTop: '8px',
                border: '2px solid #d1d5db',
                borderRadius: '10px',
                fontSize: '18px',
                transition: 'all 0.3s ease',
                outline: 'none',
                backgroundColor: '#f9fafb',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
              }}
              placeholder="Choose a password"
              whileFocus={{
                borderColor: '#4f46e5',
                boxShadow: '0 0 0 4px rgba(79, 70, 229, 0.1)',
              }}
              whileHover={{
                backgroundColor: '#f3f4f6',
              }}
              required
            />
          </div>

          {error && <p style={{ color: 'red', marginBottom: '16px', textAlign: 'center' }}>{error}</p>}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98, y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: loading ? '#a3a3f7' : '#4f46e5',
              color: 'white',
              borderRadius: '10px',
              fontSize: '20px',
              fontWeight: '700',
              transition: 'all 0.3s ease',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 6px 12px -4px rgba(79, 70, 229, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
