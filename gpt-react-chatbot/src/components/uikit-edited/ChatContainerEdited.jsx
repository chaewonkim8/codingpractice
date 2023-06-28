import React from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { ChatContainer, ConversationHeader, MessageInput, MessageList } from '@chatscope/chat-ui-kit-react';
import ChatlogEdited from './ChatlogEdited.jsx'

function ChatContainerEdited ({onSend, chatHistory}) {

    return(
        <div style={{
            height: "500px"
        }}>
            <ChatContainer>
                <ConversationHeader>
                    <ConversationHeader.Content userName="Counselor Chatbot" info="legal assitant for migrant workers" />
                    <ConversationHeader.Actions>
                        {/* <InfoButton /> */}
                    </ConversationHeader.Actions>
                </ConversationHeader>
                <div as={MessageList}> 
                    <ChatlogEdited chatHistory={chatHistory}/> 
                </div>  
                <MessageInput attachButton={false} onSend={onSend} placeholder="Type message here" />
            </ChatContainer>
        </div>
    )

}

export default ChatContainerEdited