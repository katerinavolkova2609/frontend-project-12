import React from 'react';
import { clean } from 'leo-profanity';

const MessaageList = ({ messages, currentChannel }) => {
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messages
        .filter((item) => item.channelId === currentChannel.id)
        .map((message) => (
          <div key={message.id} className="text-break mb-2">
            <b>{message.username}</b>
            {': '}
            {clean(message.body)}
          </div>
        ))}
    </div>
  );
};

export default MessaageList;
