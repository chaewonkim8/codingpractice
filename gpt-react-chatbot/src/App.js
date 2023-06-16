import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Mainbox from './components/Mainbox.jsx'

let didInit = false;
let callCount = 0;

function App() {
  const [inputMessages, setInputMessages] = useState([]);
  const [outputMessages, setOutputMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      console.log(didInit);
      sendCounselorRequest();
    }
    // const initialMessage = {
    //   id: "0",
    //   class: 'bot-message',
    //   content: "Welcome, how can I assist you today?"
    // };
    // setChatHistory([initialMessage]);
  }, []);

  useEffect(() => {
    if (inputMessages.length > 0) {
      sendCounselorRequest();
    }
  }, [inputMessages]);

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
      console.log("input: " + inputMessages);
      console.log("output: " + outputMessages);
      callCount = callCount + 1;
      console.log(callCount);

      setOutputMessages(prevOutputMessages => [...prevOutputMessages, assistant]);

      setChatHistory(prevChatHistory => [
        ...prevChatHistory,
        {
          id: prevChatHistory.length.toString(),
          class: 'bot-message',
          content: assistant
        }
      ]);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  }

  function handleUserMessage(userMessage) {
    if (userMessage === '') return;
    console.log("handleUserMessage: " + userMessage);
    setInputMessages(prevInputMessages => [...prevInputMessages, userMessage]);

    setChatHistory(prevChatHistory => [
      ...prevChatHistory,
      {
        id: prevChatHistory.length.toString(),
        class: 'user-message',
        content: userMessage
      }
    ]);
  }

  return (
    <div>
      <Header />
      <Mainbox chatHistory={chatHistory} onSend={handleUserMessage} />
    </div>
  );
}

export default App;
