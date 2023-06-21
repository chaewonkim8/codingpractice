import React from "react";
import TextField from '@mui/material/TextField';

function Textarea({ value, onChange, onKeyDown }) {
    return (
      <TextField
        fullWidth
        id="message"
        placeholder="Type your message here..."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    );
  }

export default Textarea;