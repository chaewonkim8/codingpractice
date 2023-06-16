import React from 'react';
import { useState } from 'react';
import ChatMessage from './ChatMessage.jsx'

function Chatlog({ chatHistory }) {
    return (
      <div className="chatlog">
        {chatHistory.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
    );
  }

export default Chatlog;