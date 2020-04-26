import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Threads from './components/Threads';
import NumberPicker from './components/NumberPicker';

const messagingPage = document.getElementById('messages-page');
const smsNumberPicker = document.getElementById('sms-number-picker');

if (messagingPage) {
  ReactDOM.render(
    <ErrorBoundary>
      <Threads />
    </ErrorBoundary>,
    messagingPage
  );
}

if (smsNumberPicker) {
  ReactDOM.render(
    <ErrorBoundary>
      <NumberPicker />
    </ErrorBoundary>,
    smsNumberPicker
  );
}
