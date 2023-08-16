//using Chatscope UI Kit

import React, { useState, useEffect } from 'react';
import './App.module.css';
import ChatContainerEdited from './components/uikit-edited/ChatContainerEdited.jsx'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer} from "@chatscope/chat-ui-kit-react";

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
      //add bot-message to chatHistory
      setChatHistory(prevChatHistory => [
        ...prevChatHistory,
        {
          id: prevChatHistory.length.toString(),
          class: 'bot-message',
          message: assistant,
          direction: "incoming"
        }
      ]);
      console.log("chatHistory: " + JSON.stringify(chatHistory))
    } catch (error) {
      // Handle error
      console.error(error);
    }
  }

  function handleUserMessage(userMessage) {
    if (userMessage === '') return;
    console.log("handleUserMessage: " + userMessage);
    setInputMessages(prevInputMessages => [...prevInputMessages, userMessage]);

    //add user-message to chatHistory
    setChatHistory(prevChatHistory => [
      ...prevChatHistory,
      {
        id: prevChatHistory.length.toString(),
        class: 'user-message',
        message: userMessage,
        direction: "outgoing"
      }
    ]);
    console.log("chatHistory: " + JSON.stringify(chatHistory))
  }

  return (
    <div classname={styles.myGlobalClass} style={{ position: "relative", height: "500px" }}>
      <MainContainer>
        <ChatContainerEdited onSend = {handleUserMessage} chatHistory={chatHistory}/>
      </MainContainer>
    </div>
  );
}

export default App;
