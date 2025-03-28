// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { colors } from './styles/colors';
import wsService from './services/websocket';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [sessionId, setSessionId] = useState(localStorage.getItem('chat_session_id') || null);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Connect to WebSocket when component mounts
    wsService.connect();

    // Set up message handler
    const unsubscribeMessage = wsService.onMessage((data) => {
      setIsLoading(false);
      
      // Store the session ID if provided
      if (data.session_id) {
        setSessionId(data.session_id);
        localStorage.setItem('chat_session_id', data.session_id);
      }
      
      // Format the bot message
      const botMessage = {
        id: Date.now(),
        text: data.answer || "Sorry, I couldn't process your request.",
        sender: 'bot',
        timestamp: new Date(),
        metadata: {
          is_direct_match: data.is_direct_match || false,
          similarity_score: data.similarity_score || 0.0,
          suggested_follow_ups: data.suggested_follow_ups || []
        }
      };
      
      setMessages(prev => [...prev, botMessage]);
    });

    // Set up connection status handler
    const unsubscribeStatus = wsService.onStatusChange((status) => {
      setIsConnected(status);
    });

    // Clean up when component unmounts
    return () => {
      unsubscribeMessage();
      unsubscribeStatus();
      wsService.disconnect();
    };
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text) => {
    if (text.trim() === '') return;
    
    // Add user message
    const newMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);
    
    // Send message via WebSocket
    const success = wsService.sendMessage(text, sessionId);
    
    // Fallback for connection issues
    if (!success) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: "I'm having trouble connecting to the server. Please try again later.",
          sender: 'bot',
          timestamp: new Date(),
          isError: true
        }]);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: colors.background,
      color: colors.text,
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <ChatHeader isConnected={isConnected} />
      <MessageList 
        messages={messages} 
        isLoading={isLoading} 
        messagesEndRef={messagesEndRef} 
      />
      <MessageInput 
        input={input} 
        setInput={setInput} 
        sendMessage={sendMessage} 
        isLoading={isLoading} 
        isConnected={isConnected}
      />
    </div>
  );
}

export default App;