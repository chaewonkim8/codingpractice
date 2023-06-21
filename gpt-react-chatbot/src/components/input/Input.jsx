import React from "react";
import { useState } from "react";
import Textarea from './Textarea.jsx'
import SendButton from './SendButton.jsx'
import Grid from '@mui/material/Grid';

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
      <Grid className="input">
        <Textarea xs={10} value={message} onChange={handleInputChange} onKeyDown={handleKeyDown} />
        <SendButton xs={4} onSend={() => { onSend(message); setMessage(''); }} />
      </Grid>
    );
  }

export default Input;