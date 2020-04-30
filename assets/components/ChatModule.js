import React, { useContext, useState } from 'react';
import { ThreadContext } from './Threads';
import types from './actionTypes'
import TextareaAutosize from 'react-textarea-autosize';
import http from '../http';

function ChatItem({ message }) {
  const { students, course } = useContext(ThreadContext)
  const student = students.find(student => student.phone_number === message.from)

  let name;

  if (message.from == course.phone_number) {
    name = "You"
  } else if (student) {
    name = student.name
  } else {
    name = "Unknown"
  }

  return (
    <div className="media chat-item">
      <div className="media-body">
        <div className="chat-item-title">
          <span className="chat-item-author">{name}</span>
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
  const { messages, activeThread, dispatch } = useContext(ThreadContext)

  const listOfMessages = activeThread ? activeThread : messages;

  return (
    <div className="chat-module-top">
      <div className="d-flex justify-content-between">
        <h2>{activeThread ? "Viewing Thread" : "All Messages"}</h2>
        <button className="btn btn-primary btn-sm" onClick={() => dispatch({ type: types.viewAllThreads })}>
          View All Messages
         </button>
      </div>
      <div className="chat-module-body">
        {listOfMessages.map(msg => <ChatItem key={msg.sms_sid} message={msg} />)}
      </div>
    </div>
  );
}

function ChatModuleBotton() {
  const { activeStudent, activeThread, dispatch } = useContext(ThreadContext)
  const [message, setMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(activeStudent)
    try {
      const { data } = await http.post(`/courses/${course.id}/messages`, {
        body: message,
        student: activeStudent
      });

      dispatch({ type: types.addMessage, message: data })
      setMessage('')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="chat-module-bottom">
      {activeThread ? (
        <>
          <form onSubmit={handleSubmit} className="chat-form">
            <div className="form-row align-items-center justify-content-center">
              <div className="col-10">
                <TextareaAutosize value={message} onChange={(e) => setMessage(e.target.value)} className="form-control" placeholder="Type Message" />
              </div>
              <div className="col-auto">
                <button className="btn btn-primary" type="submit">Send</button>
              </div>
            </div>
          </form>
        </>
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
