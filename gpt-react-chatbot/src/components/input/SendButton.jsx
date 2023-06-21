import React from "react";
import Button from '@mui/material/Button';

function SendButton({ onSend }) {
  return (
    <Button variant="contained" id="send-btn" className="send-button" onClick={onSend}>
      Send
    </Button>
  );
}

export default SendButton;