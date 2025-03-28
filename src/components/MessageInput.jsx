import React from 'react';
import { Send, Loader } from 'lucide-react';
import { colors } from '../styles/colors';

const MessageInput = ({ input, setInput, sendMessage, isLoading, isConnected }) => {
  return (
    <div style={{ 
      borderTop: '1px solid rgba(0,0,0,0.1)', 
      padding: '16px 24px',
      backgroundColor: 'white'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: colors.background,
        borderRadius: '24px',
        padding: '8px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        opacity: isConnected ? 1 : 0.7
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && isConnected) {
              e.preventDefault();
              sendMessage(input);
            }
          }}
          placeholder={isConnected ? "Type your message..." : "Connecting to server..."}
          disabled={!isConnected || isLoading}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            fontSize: '16px',
            padding: '8px 0'
          }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={input.trim() === '' || isLoading || !isConnected}
          style={{
            backgroundColor: colors.accent,
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: (input.trim() === '' || !isConnected) ? 'not-allowed' : 'pointer',
            opacity: (input.trim() === '' || !isConnected) ? 0.7 : 1,
            transition: 'all 0.2s ease'
          }}
        >
          {isLoading ? <Loader size={18} /> : <Send size={18} />}
        </button>
      </div>
      {!isConnected && (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '8px', 
          fontSize: '14px', 
          color: colors.lightText 
        }}>
          Attempting to connect to the server...
        </div>
      )}
    </div>
  );
};

export default MessageInput;