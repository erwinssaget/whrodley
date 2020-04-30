import React, { useContext } from 'react';
import { ThreadContext } from './Threads';

function ChatItem({ message }) {
  const { students } = useContext(ThreadContext)

  const student = students.filter(student => student.phone_number === message.from)

  let studentName;

  if (student && Array.isArray(student) && student.length > 0) {
    studentName = student[0].name;
  } else if (student && student.name) {
    studentName = student.name;
  } else {
    studentName = "Unknown Student";
  }

  return (
    <div className="media chat-item">
      <div className="media-body">
        <div className="chat-item-title">
          <span className="chat-item-author">{studentName}</span>
          <span className="">
            {message.created_at}
          </span>
        </div>
        <div className="chat-item-body DIV-filter-by-text">
          <p>{message.body}</p>
        </div>
      </div>
    </div>
  );
}

function ChatModuleTop() {
  const { messages, activeThread } = useContext(ThreadContext)

  const listOfMessages = activeThread ? activeThread : messages;

  return (
    <div className="chat-module-top">
      <h2>{activeThread ? "Viewing Thread" : "All Messages"}</h2>
      <div className="chat-module-body">
        {listOfMessages.map(msg => <ChatItem key={msg.sms_sid} message={msg} />)}
      </div>
    </div>
  );
}

function ChatModuleBotton() {
  const { activeThread } = useContext(ThreadContext)

  return (
    <div className="chat-module-bottom">
      {activeThread ? (
        <form className="chat-form">
          <textarea
            className="form-control"
            placeholder="Type Message"
            rows="1"
          />
        </form>
      ) : (
          <p className="text-center">Select A Student to view specific messages and reply.</p>
        )}
    </div>
  );
}

function ChatModule({ messages }) {
  return (
    <div className="chat-module">
      <ChatModuleTop />
      <ChatModuleBotton />
    </div>
  );
}

export default React.memo(ChatModule);
