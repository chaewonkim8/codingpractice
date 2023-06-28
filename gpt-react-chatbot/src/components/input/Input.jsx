import React from "react";
import { useState } from "react";
import Textarea from './Textarea.jsx'
import SendButton from './SendButton.jsx'
import Box from '@mui/material/Box';

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
      <Box sx={{ display: 'grid', gridAutoColumns: '1fr', gap: 1, }} className="input">
        <Textarea sx={{ gridRow: '1', gridColumn: '1 / 3' }} value={message} onChange={handleInputChange} onKeyDown={handleKeyDown} />
        <SendButton sx={{ gridRow: '1', gridColumn: '3 / 4' }} onSend={() => { onSend(message); setMessage(''); }} />
      </Box>
    );
    
  }

export default Input;