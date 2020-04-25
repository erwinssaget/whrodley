import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import http from '../http';

export default function Threads() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await http.get('messages');
        setMessages(res.data);
        setNumbers([...new Set(res.data.map((msg) => msg.to))]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      http.post('messages', {
        body: message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            id="body"
            name="message-body"
            className="form-input block w-full pl-16 sm:text-sm sm:leading-5"
            value={message.value}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit">Send Message</button>
      </form>

      <ul>
        {messages && messages.map((msg) => <li key={msg.id}>{msg.body}</li>)}
      </ul>
    </div>
  );
}
