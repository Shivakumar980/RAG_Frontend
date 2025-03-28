// src/services/websocket.js
class WebSocketService {
    constructor(url) {
      this.url = url;
      this.socket = null;
      this.isConnected = false;
      this.reconnectAttempts = 0;
      this.maxReconnectAttempts = 5;
      this.reconnectTimeout = 2000; // Start with 2 seconds
      this.messageCallbacks = [];
      this.statusCallbacks = [];
    }
  
    connect() {
      if (this.socket?.readyState === WebSocket.OPEN) {
        console.log('WebSocket is already connected.');
        return;
      }
  
      this.socket = new WebSocket(this.url);
  
      this.socket.onopen = () => {
        console.log('WebSocket connection established');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.reconnectTimeout = 2000;
        this._notifyStatusChange(true);
      };
  
      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Format the data to match your FastAPI response structure
          const formattedData = {
            session_id: data.session_id,
            answer: data.answer,
            is_direct_match: data.is_direct_match || false,
            similarity_score: data.similarity_score || 0.0,
            suggested_follow_ups: data.suggested_follow_ups || []
          };
          
          this._notifyMessageReceived(formattedData);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
          this._notifyMessageReceived({
            answer: "Sorry, there was an error processing the response.",
            is_direct_match: false,
            similarity_score: 0.0
          });
        }
      };
  
      this.socket.onclose = (event) => {
        console.log(`WebSocket connection closed: ${event.code} ${event.reason}`);
        this.isConnected = false;
        this._notifyStatusChange(false);
        this._attemptReconnect();
      };
  
      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    }
  
    disconnect() {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
        this.isConnected = false;
      }
    }
  
    sendMessage(query, sessionId = null) {
      if (!this.isConnected) {
        console.warn('WebSocket is not connected. Attempting to connect...');
        this.connect();
        return false;
      }
  
      try {
        // Format to match your QueryRequest structure
        const message = {
          query: query,
          session_id: sessionId
        };
        
        this.socket.send(JSON.stringify(message));
        return true;
      } catch (error) {
        console.error('Error sending message:', error);
        return false;
      }
    }
  
    onMessage(callback) {
      this.messageCallbacks.push(callback);
      return () => {
        this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback);
      };
    }
  
    onStatusChange(callback) {
      this.statusCallbacks.push(callback);
      return () => {
        this.statusCallbacks = this.statusCallbacks.filter(cb => cb !== callback);
      };
    }
  
    _notifyMessageReceived(data) {
      this.messageCallbacks.forEach(callback => callback(data));
    }
  
    _notifyStatusChange(isConnected) {
      this.statusCallbacks.forEach(callback => callback(isConnected));
    }
  
    _attemptReconnect() {
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.log('Maximum reconnection attempts reached.');
        return;
      }
  
      this.reconnectAttempts++;
      const timeout = this.reconnectTimeout * Math.pow(1.5, this.reconnectAttempts - 1);
      console.log(`Attempting to reconnect in ${timeout / 1000} seconds...`);
  
      setTimeout(() => {
        console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
        this.connect();
      }, timeout);
    }
  }
  
  // Create and export a singleton instance
  // Use your FastAPI WebSocket endpoint here
  const wsService = new WebSocketService('ws://localhost:8000/ws/chat');
  
  export default wsService;