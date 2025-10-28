import React, { useState } from 'react';
import './App.css';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import axios from 'axios';

// Get API URL from environment variable with fallback
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Feature flag to enable/disable API calls
const API_ENABLED = process.env.REACT_APP_API_ENABLED === 'true';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm InsightChat. Ask me any question related to internal confluence and google drive documentation and I'll help you find the answer.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (question) => {
    if (!question.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: question,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Check if API is enabled via feature flag
    if (!API_ENABLED) {
      // API is disabled - show informational message
      const disabledMessage = {
        id: Date.now() + 1,
        text: "Currently this feature is turned OFF. Please contact the system administrator to turn ON this feature.",
        sender: 'bot',
        timestamp: new Date(),
        isInfo: true
      };
      setMessages(prev => [...prev, disabledMessage]);
      setIsLoading(false);
      return;
    }

    try {
      // Call the API endpoint using configured URL
      const response = await axios.post(`${API_URL}/api/ask`, {
        question: question
      });

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: response.data.answer || response.data.response || 'I received your question but got an empty response.',
        citations: response.data.citations || [],
        sources: response.data.sources || [],
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error calling API:', error);
      
      // Determine user-friendly error message
      let errorText = 'Sorry, I encountered an error. ';
      
      if (error.response) {
        // Server responded with an error
        if (error.response.status === 404) {
          errorText += 'The API endpoint was not found. Please check the backend configuration.';
        } else if (error.response.status === 500) {
          errorText += 'The server encountered an internal error. Please try again later.';
        } else if (error.response.status === 503) {
          errorText += 'The service is temporarily unavailable. Please try again in a moment.';
        } else {
          errorText += error.response.data?.detail || error.response.data?.message || 'An unexpected error occurred on the server.';
        }
      } else if (error.request) {
        // Request was made but no response received
        errorText += `Unable to connect to the server. Please make sure the backend is running at ${API_URL} and try again.`;
      } else {
        // Something else happened
        errorText += error.message || 'An unexpected error occurred. Please try again.';
      }
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        text: errorText,
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-header">
          <div className="header-content">
            <div className="logo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" fill="white" opacity="0.2"/>
                <path d="M16 8v8l6 3.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="header-text">
              <h1>InsightChat</h1>
              <p>AI-Powered Question Answering</p>
            </div>
          </div>
        </div>
        
        <div className="messages-container">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="loading-indicator">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>
        
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;

