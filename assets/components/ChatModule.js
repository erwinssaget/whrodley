import React from 'react';

function ChatModuleTop() {
  return <div className="chat-module-top">top</div>
}

function ChatModuleBotton() {
  return (
    <div className="chat-module-bottom">
      <form className="chat-form">
        <textarea className="form-control" placeholder="Type Message" rows="1"></textarea>
      </form>
    </div>
  )
}

export default function ChatModule() {
  return (
    <div className="chat-module">
      <ChatModuleTop />
      <ChatModuleBotton />
    </div>
  )
}
