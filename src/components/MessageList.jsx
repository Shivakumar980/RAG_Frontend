// src/components/MessageList.jsx
import React from 'react';
import { MessageSquare } from 'lucide-react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { colors } from '../styles/colors';

const MessageList = ({ messages, isLoading, messagesEndRef }) => {
  return (
    <div style={{ 
      flex: 1, 
      overflowY: 'auto', 
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      {messages.length === 0 ? (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          height: '100%',
          color: colors.lightText
        }}>
          <MessageSquare size={36} strokeWidth={1.5} />
          <p style={{ marginTop: '16px' }}>Start a conversation with your RAG chatbot</p>
        </div>
      ) : (
        messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))
      )}
      {isLoading && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;