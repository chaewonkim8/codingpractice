import React from 'react';
import { useState } from 'react';
import Input from './input/Input.jsx';
import Chatlog from './chat/Chatlog.jsx'
import Box from '@mui/material/Box';

function Mainbox({ chatHistory, onSend }) {
    return (
      <Box id="mainbox">
        <Chatlog chatHistory={chatHistory} />
        <Input onSend={onSend} />
      </Box>
    );
  }
export default Mainbox;