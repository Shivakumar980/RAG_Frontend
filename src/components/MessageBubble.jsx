// src/components/MessageBubble.jsx
import React from 'react';
import { colors } from '../styles/colors';

const MessageBubble = ({ message }) => {
  // Format timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
    }}>
      <div style={{
        backgroundColor: message.sender === 'user' ? colors.userBubble : colors.botBubble,
        color: message.sender === 'user' ? 'white' : colors.text,
        padding: '12px 16px',
        borderRadius: '18px',
        borderTopRightRadius: message.sender === 'user' ? '4px' : '18px',
        borderTopLeftRadius: message.sender === 'bot' ? '4px' : '18px',
        maxWidth: '80%',
        boxShadow: message.sender === 'bot' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
        border: message.sender === 'bot' ? '1px solid rgba(0,0,0,0.1)' : 'none',
        wordBreak: 'break-word'
      }}>
        {message.text}
      </div>
      <span style={{
        fontSize: '12px',
        marginTop: '4px',
        color: colors.lightText,
        padding: '0 8px'
      }}>
        {formatTime(message.timestamp)}
      </span>
    </div>
  );
};

export default MessageBubble;