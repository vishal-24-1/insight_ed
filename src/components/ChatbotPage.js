import React, { useState } from 'react';

const ChatBotUI = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const styles = {
    container: {
      width: '500px',
      height: '600px',
      background: '#ffffff',
      borderRadius: '10px',
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    header: {
      background: '#8e44ad',
      color: '#ffffff',
      padding: '10px',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    chatArea: {
      flex: 1,
      padding: '10px',
      overflowY: 'auto',
      background: '#f2f2f2',
    },
    userBubble: {
      backgroundColor: '#e6f3ff',
      alignSelf: 'flex-end',
      padding: '10px',
      borderRadius: '20px',
      marginBottom: '10px',
      maxWidth: '70%',
    },
    botBubble: {
      backgroundColor: '#f0f0f0',
      alignSelf: 'flex-start',
      padding: '10px',
      borderRadius: '20px',
      marginBottom: '10px',
      maxWidth: '70%',
    },
    inputContainer: {
      display: 'flex',
      padding: '10px',
      borderTop: '1px solid #ccc',
    },
    input: {
      flex: 1,
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '5px',
    },
    sendButton: {
      marginLeft: '10px',
      background: '#8e44ad',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '5px 10px',
      cursor: 'pointer',
    },
    loadingSpinner: {
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #3498db',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      animation: 'spin 1s linear infinite',
      alignSelf: 'center',
      margin: '10px',
    },
  };

  const fetchBotResponse = async (userMessage) => {
    setIsLoading(true);
    try {
      const apiKey = 'AIzaSyBhYT2O9QyISU7_9319oJWLIgIihf3sLX4';
      const payload = {
        contents: [
          { role: 'user', parts: [{ text: userMessage }] },
        ],
        generationConfig: {
          temperature: 0.7,
          top_p: 0.95,
          top_k: 40,
          max_output_tokens: 250,
        },
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      const botMessage =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm sorry, I couldn't process your request.";
      setMessages((prev) => [...prev, { role: 'bot', content: botMessage }]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Something went wrong. Please try again later.' },
      ]);
    }
    setIsLoading(false);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = input.trim();
      setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
      setInput('');
      fetchBotResponse(userMessage);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        Insight_Ed AI Assistant
        <button onClick={onClose} style={{ float: 'right', background: 'none', color: '#fff', border: 'none' }}>
          ✕
        </button>
      </div>
      <div style={styles.chatArea}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={msg.role === 'user' ? styles.userBubble : styles.botBubble}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && <div style={styles.loadingSpinner}></div>}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={styles.input}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBotUI;
