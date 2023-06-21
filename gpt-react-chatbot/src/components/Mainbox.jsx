import React from 'react';
import { useState } from 'react';
import Input from './input/Input.jsx';
import Chatlog from './chat/Chatlog.jsx'

function Mainbox({ chatHistory, onSend }) {
    return (
      <div id="mainbox">
        <Chatlog chatHistory={chatHistory} />
        <Input onSend={onSend} />
        {/* {console.log(chatHistory)} */}
      </div>
    );
  }
export default Mainbox;