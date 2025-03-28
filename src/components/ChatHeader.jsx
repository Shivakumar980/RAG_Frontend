import React from 'react';
import { MessageSquare } from 'lucide-react';
import { colors } from '../styles/colors';

const ChatHeader = ({ isConnected }) => {
  return (
    <header style={{ 
      height: '60px', 
      borderBottom: '1px solid rgba(0,0,0,0.1)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0 24px',
      backgroundColor: colors.accent,
      color: 'white'
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MessageSquare size={24} style={{ marginRight: '10px' }} />
        <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>RAG Chatbot</h1>
      </div>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        fontSize: '14px' 
      }}>
        <span style={{ 
          height: '10px', 
          width: '10px', 
          borderRadius: '50%', 
          backgroundColor: isConnected ? '#4CAF50' : '#F44336',
          marginRight: '8px'
        }}></span>
        {isConnected ? 'Connected' : 'Disconnected'}
      </div>
    </header>
  );
};

export default ChatHeader;