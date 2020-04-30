import React, { useEffect, useReducer, createContext } from 'react';
import ChatModule from './ChatModule';
import Sidebar from './Sidebar';
import http from '../http';
import pusher from '../pusher';
import types from './actionTypes';

export const ThreadContext = createContext({
  course: window.course,
});

function Threads() {
  const initialThreadState = {
    course: window.course,
    students: [],
    messages: [],
    activeThread: null
  }

  const threadsReducer = function (state, action) {
    switch (action.type) {
      case types.setActiveThreadForStudent:
        const student = action.student;
        const studentPhoneNumber = student.phone_number;
        const messages = state.messages.filter(msg => msg.from === studentPhoneNumber)
        return { ...state, activeThread: messages };
      case types.addStudent:
        const updatedStudentList = [...state.students, action.student];
        return { ...state, students: updatedStudentList }
      case types.setStudents:
        return { ...state, students: action.students }
      case types.addMessage:
        const updatedMessages = [...state.messages, action.message]
        return { ...state, messages: updatedMessages }
      case types.setMessages:
        return { ...state, messages: action.messages }
      default:
        console.log(`Executed default case in reducer`);
        return state;
    }
  }

  const [{ course, students, messages, activeThread }, dispatch] = useReducer(threadsReducer, initialThreadState)

  // Set up pusher for real time
  useEffect(() => {
    const channel = pusher.subscribe(`course-${course.id}`);

    channel.bind('incoming-sms', ({ message }) => {
      if (message) {
        dispatch({ type: types.addMessage, message })
      }
    });

    return () => {
      pusher.unsubscribe(`course-${course.id}`)
    }
  }, []);

  // fetch all messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await http.get('messages');
        dispatch({ type: types.setMessages, messages: data })
      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();
  }, []);

  // fetch all students for this class
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await http.get(`/courses/${course.id}/students`)

        dispatch({ type: types.setStudents, students: data })
      } catch (err) {
        console.log(err)
      }
    }

    fetchStudents();
  }, [course.id]);

  const value = {
    course,
    students,
    messages,
    activeThread,
    dispatch
  }

  return (
    <div className="content-container">
      <ThreadContext.Provider value={value}>
        <ChatModule />
        <Sidebar />
      </ThreadContext.Provider>
    </div>
  );
}

export default Threads;
