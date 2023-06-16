import React, { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx'
import Input from './components/Input.jsx'

function App() {
  const [inputMessages, setInputMessages] = useState([]);
  const [outputMessages, setOutputMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState({
    inputMessages: [],
    outputMessages: []
    });

  async function sendCounselorRequest() {
    try {
      const response = await fetch('https://www.deployapp.click/counselor', {
        method: 'POST',
        body: JSON.stringify({
          inputMessages: inputMessages,
          outputMessages: outputMessages
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const { assistant } = await response.json();
      setOutputMessages([...outputMessages, assistant]);
      setChatHistory({
        ...chatHistory,
        inputMessages: inputMessages,
        outputMessages: outputMessages
      });
      
    } catch (error) {
      // Handle error
      console.error(error);
    }
  }

  function handleUserMessage(userMessage) {
    if (userMessage === '') return;

    setInputMessages([...inputMessages, userMessage]);
    setChatHistory({
      ...chatHistory,
      inputMessages: inputMessages,
      outputMessages: outputMessages
    });
    sendCounselorRequest();
  }

  return (
    <div>
      <Header />
      <Chatbox chatHistory={chatHistory} onSend={handleUserMessage} />
    </div>
  );
}

function Chatbox({ chatHistory, onSend }) {
  return (
    <div id="chatbox">
      <Chatlog chatHistory={chatHistory} />
      <Input onSend={onSend} />
    </div>
  );
}

function Chatlog({ chatHistory }) {
  return (
    <div className="chatlog">
      {chatHistory.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
}

function ChatMessage({ message }) {
  return <div className="message chat-message">{message}</div>;
}

export default App;
