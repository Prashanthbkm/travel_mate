import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaUser, FaPaperPlane, FaTimes, FaCommentDots } from 'react-icons/fa';
import './TravelChatbot.css';

const TravelChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your TravelMate AI assistant! 🧳 I can help you plan trips, suggest destinations, track expenses, and more! How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sample AI responses - In real app, connect to OpenAI API
  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! 👋 Ready to plan your next adventure? I can help with destination suggestions, itinerary planning, budget tracking, and more!";
    }
    else if (lowerMessage.includes('destination') || lowerMessage.includes('place')) {
      return "Great! 🌍 I can suggest amazing destinations! Are you looking for beach vacations, mountain treks, city tours, or cultural experiences?";
    }
    else if (lowerMessage.includes('budget') || lowerMessage.includes('expensive') || lowerMessage.includes('cost')) {
      return "💰 I can help you track expenses! Check out our Expense Tracker feature. For budget tips: Southeast Asia is great for budget travel, while Europe offers amazing value with advance planning!";
    }
    else if (lowerMessage.includes('itinerary') || lowerMessage.includes('plan')) {
      return "📅 Perfect! Use our Itinerary Planner to create day-by-day plans. Pro tip: Balance busy days with relaxation time. Want me to suggest a sample itinerary?";
    }
    else if (lowerMessage.includes('weather') || lowerMessage.includes('season')) {
      return "🌤️ The best travel seasons are: Europe (May-Sep), Southeast Asia (Nov-Feb), Caribbean (Dec-Apr). Always check specific destination weather before booking!";
    }
    else if (lowerMessage.includes('carbon') || lowerMessage.includes('eco') || lowerMessage.includes('sustainable')) {
      return "🌱 Love that you're thinking sustainably! Use our Carbon Calculator to measure your footprint. Trains over flights, eco-hotels, and local experiences reduce impact!";
    }
    else if (lowerMessage.includes('community') || lowerMessage.includes('share')) {
      return "👥 Our Travel Community is perfect for sharing experiences! Get authentic tips, share photos, and connect with fellow travelers who've been where you're going!";
    }
    else if (lowerMessage.includes('feature') || lowerMessage.includes('what can you do')) {
      return "🚀 I can help you: • Plan itineraries • Track expenses • Calculate carbon footprint • Suggest destinations • Share with community • Budget planning • Travel tips!";
    }
    else {
      return "That's interesting! As your travel AI, I can help with itinerary planning, expense tracking, destination suggestions, carbon footprint calculation, and connecting with other travelers. What specific travel help do you need?";
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: getAIResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Suggest destinations",
    "Help plan itinerary",
    "Budget travel tips",
    "Eco-friendly travel"
  ];

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaCommentDots />}
      </button>

      {/* Chatbot Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        {/* Chat Header */}
        <div className="chatbot-header">
          <div className="chatbot-avatar">
            <FaRobot />
          </div>
          <div className="chatbot-info">
            <h3>TravelMate AI</h3>
            <span className="status">
              <span className="status-dot"></span>
              Online
            </span>
          </div>
          <button 
            className="close-chatbot"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="chatbot-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-avatar">
                {message.sender === 'user' ? <FaUser /> : <FaRobot />}
              </div>
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot-message typing">
              <div className="message-avatar">
                <FaRobot />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 2 && (
          <div className="quick-questions">
            <p>Quick questions:</p>
            <div className="quick-buttons">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="quick-btn"
                  onClick={() => {
                    setInputMessage(question);
                    setTimeout(handleSendMessage, 100);
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Input */}
        <div className="chatbot-input">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about travel planning, destinations, budgets..."
            rows="1"
          />
          <button 
            className="send-button"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </>
  );
};

export default TravelChatbot;