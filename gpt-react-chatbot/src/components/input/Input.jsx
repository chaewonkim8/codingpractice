import React from "react";
import { useState } from "react";
import Textarea from './Textarea.jsx'
import Button from './Button.jsx'

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

export default Input;