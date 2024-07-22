import React from 'react';
import Chatbot from './Chatbot';

const App = () => {
  return (
    <div style={styles.appContainer}>
      <header style={styles.header}>
        <h1>German Exam Generator Chatbot</h1>
      </header>
      <main style={styles.main}>
        <Chatbot />
      </main>
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  header: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'center',
  },
  main: {
    flex: 1,
    width: '100%',
    maxWidth: '600px',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default App;
