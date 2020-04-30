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
    activeThread: null,
    activeStudent: null,
  }

  const threadsReducer = function (state, action) {
    switch (action.type) {
      case types.setActiveThreadForStudent:
        const student = action.student;
        const studentPhoneNumber = student.phone_number;
        const messages = state.messages.filter(msg => msg.from === studentPhoneNumber)
        return { ...state, activeThread: messages, activeStudent: student };
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
      case types.viewAllThreads:
        return { ...state, activeThread: null, activeStudent: null }
      default:
        console.log(`Executed default case in reducer`);
        return state;
    }
  }

  const [state, dispatch] = useReducer(threadsReducer, initialThreadState)

  // Set up pusher for real time
  useEffect(() => {
    const channel = pusher.subscribe(`course-${state.course.id}`);

    channel.bind('incoming-sms', ({ message }) => {
      if (message) {
        dispatch({ type: types.addMessage, message })
      }
    });

    return () => {
      pusher.unsubscribe(`course-${state.course.id}`)
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
        const { data } = await http.get(`/courses/${state.course.id}/students`)

        dispatch({ type: types.setStudents, students: data })
      } catch (err) {
        console.log(err)
      }
    }

    fetchStudents();
  }, [state.course.id]);

  const value = {
    ...state,
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
