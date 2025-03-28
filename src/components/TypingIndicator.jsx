// src/components/TypingIndicator.jsx
import React from 'react';
import { colors } from '../styles/colors';

const TypingIndicator = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      marginTop: '8px'
    }}>
      <div style={{
        backgroundColor: colors.botBubble,
        padding: '12px 16px',
        borderRadius: '18px',
        borderTopLeftRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        border: '1px solid rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div className="typing-dot" style={{
            height: '8px',
            width: '8px',
            borderRadius: '50%',
            backgroundColor: colors.accent,
            opacity: 0.6,
            animation: 'typing-animation 1.4s infinite both',
            animationDelay: '0s'
          }}></div>
          <div className="typing-dot" style={{
            height: '8px',
            width: '8px',
            borderRadius: '50%',
            backgroundColor: colors.accent,
            opacity: 0.6,
            animation: 'typing-animation 1.4s infinite both',
            animationDelay: '0.2s'
          }}></div>
          <div className="typing-dot" style={{
            height: '8px',
            width: '8px',
            borderRadius: '50%',
            backgroundColor: colors.accent,
            opacity: 0.6,
            animation: 'typing-animation 1.4s infinite both',
            animationDelay: '0.4s'
          }}></div>
        </div>
        <style jsx>{`
          @keyframes typing-animation {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default TypingIndicator;