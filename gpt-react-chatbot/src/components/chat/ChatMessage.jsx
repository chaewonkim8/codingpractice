import React from 'react';
import { useState } from 'react';

function ChatMessage({ message }) {
    const messageClass = message.class;
  
    return (
      <div className={`message ${messageClass}`}>
        {message.content}
      </div>
    );
  }
  
  
  export default ChatMessage;