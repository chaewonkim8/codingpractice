import React from "react";
import { useState } from "react";

function Textarea({ value, onChange, onKeyDown }) {
    return (
      <textarea
        id="message"
        placeholder="Type your message here..."
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    );
  }

export default Textarea;