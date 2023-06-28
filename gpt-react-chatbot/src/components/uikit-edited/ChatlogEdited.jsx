import React from 'react';
import List from '@mui/material/List';
import { Message, Avatar } from '@chatscope/chat-ui-kit-react';
//did not use MessageList but maybe I want to..

//not using the Avatar for now
// import avatarImage from '../../logo.svg';

function ChatlogEdited({ chatHistory }) {
  return (
    <List className="chatlog" >
      {chatHistory.map((message, index) => (
        <Message key={index} model={message}>
          {/* {
            message.direction === "incoming"
            && (<Avatar src={avatarImage} name="emily" />)
          } */}
        </Message>
      ))}
    </List>
  );
}

export default ChatlogEdited;