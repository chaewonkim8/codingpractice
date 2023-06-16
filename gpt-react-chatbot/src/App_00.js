import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputMessages, setInputMessages] = useState([]);
  const [outputMessages, setOutputMessages] = useState([]);
  const [botMessage, setBotMessage] = useState('');

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
      const counselor = await response.json();
      console.log("data-received: " + counselor); // log the counselor data received
      setBotMessage(counselor.assistant);
      setOutputMessages([...outputMessages, counselor.assistant]);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  }

  function handleUserMessage(userMessage) {
    if (userMessage === '') return;

    setInputMessages([...inputMessages, userMessage]);
    console.log("input message: " + inputMessages); // log the input message array

    sendCounselorRequest();
  }

  return (
    <div>
      <Header />
      <Chatbox messages={outputMessages} onSend={handleUserMessage} />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>Support and Care for MDW</h1>
    </header>
  );
}

function Chatbox({ messages, onSend }) {
  return (
    <div id="chatbox">
      <Chatlog messages={messages} />
      <Input onSend={onSend} />
    </div>
  );
}

function Chatlog({ messages }) {
  return (
    <div className="chatlog">
      {messages.map((message, index) => (
        <BotMessage key={index} message={message} />
      ))}
    </div>
  );
}

function BotMessage({ message }) {
  return <div className="message bot-message">{message}</div>;
}

function Input({ onSend }) {
  const [message, setMessage] = useState('');

  function handleInputChange(e) {
    setMessage(e.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent the default behavior of the Enter key
      onSend(message);
      setMessage('');
    }
  }

  return (
    <div className="input">
      <Textarea value={message} onChange={handleInputChange} onKeyDown={handleKeyDown} />
      <Button onSend={() => { onSend(message); setMessage(''); }} />
    </div>
  );
}

function Textarea({ value, onChange, onKeyDown }) {
  return (
    <textarea
      id="message"
      placeholder="Type your message here..."
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

function Button({ onSend }) {
  return (
    <button id="send-btn" onClick={onSend}>
      Send
    </button>
  );
}

export default App;
