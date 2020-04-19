import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Threads from './components/Threads';
// import SmsNumberPicker from './components/smsNumberPicker';

const messagingPage = document.getElementById('messages-page');

if (messagingPage) {
  ReactDOM.render(
    <ErrorBoundary>
      <Threads />
    </ErrorBoundary>,
    messagingPage
  );
}
