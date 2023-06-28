import React from 'react';
import ListItem from '@mui/material/ListItem';

function ChatMessage({ message }) {
    const messageClass = message.class;
  
    return (
      <ListItem className={`message ${messageClass}`}>
        {message.message}
      </ListItem>
    );
  }
  
  
  export default ChatMessage;