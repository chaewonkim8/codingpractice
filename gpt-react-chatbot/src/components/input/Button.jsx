import React from "react";
import { useState } from "react";

function Button({ onSend }) {
    return (
      <button id="send-btn" onClick={onSend}>
        Send
      </button>
    );
  }

export default Button;