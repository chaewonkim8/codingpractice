import React from 'react';
import ChatMessage from './ChatMessage.jsx'
import List from '@mui/material/List';

function Chatlog({ chatHistory }) {
    return (
      <List className="chatlog">
        {chatHistory.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </List>
    );
  }

export default Chatlog;