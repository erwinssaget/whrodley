import React, { useState, useEffect } from 'react';
import ChatModule from './ChatModule'
import Sidebar from './Sidebar'
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
    <div className="content-container">
      <ChatModule />
      <Sidebar />
    </div>
  );
}
