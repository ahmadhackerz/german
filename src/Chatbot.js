import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, user: true }]);
    setInput('');

    try {
      const response = await axios.post('/api/generate-exam', { message: input });
      setMessages([...messages, { text: input, user: true }, { text: response.data.exam, user: false }]);
    } catch (error) {
      console.error('Error sending message:', error); // Log the error to console
      setMessages([...messages, { text: input, user: true }, { text: 'Error generating exam', user: false }]);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatWindow}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: message.user ? 'flex-end' : 'flex-start',
              backgroundColor: message.user ? '#DCF8C6' : '#FFF',
            }}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100vh',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    border: '1px solid #ccc',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  chatWindow: {
    flex: 1,
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  message: {
    maxWidth: '70%',
    padding: '10px',
    borderRadius: '10px',
    marginBottom: '10px',
    wordBreak: 'break-word',
  },
  inputContainer: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ccc',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default Chatbot;
