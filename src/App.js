import React, { useState } from 'react';
import './App.css';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import botAvatar from './pics/nosh.png';

const theme = {
  background: 'white',
  headerBgColor: '#ed872d',
  headerFontSize: '20px',
  botBubbleColor: '#F5F5F5',
  headerFontColor: 'white',
  botFontColor: 'black',
  userBubbleColor: '#ed872d',
  userFontColor: 'white',
  headerImage: 'none',
};

const steps = [
  {
    id: '0',
    message: 'Hello! What is your name?',
    trigger: '1',
    waitAction: true,
  },
  {
    id: '1',
    user: true,
    metadata: {
      name: 'name',
      value: '{{{raw}}}'
    },
    trigger: '2',
    waitAction: true,
  },
  {
    id: '2',
    message: 'Nice to meet you, {previousValue}! Welcome to our restaurant. What type of food would you like to order today?',
    trigger: '3',
    waitAction: true,
  },
  {
    id: '3',
    options: [
      { value: 'burger', label: 'Burger', trigger: '4' },
      { value: 'pizza', label: 'Pizza', trigger: '4' },
      { value: 'pasta', label: 'Pasta', trigger: '4' },
      { value: 'drink', label: 'Drink', trigger: '5' },
    ],
    waitAction: true,
  },
  {
    id: '4',
    message: 'How many would you like to order?',
    trigger: 'food',
    waitAction: true,
  },
  {
    id: '5',
    message: 'Would you like to order a drink?',
    trigger: '7',
    waitAction: true,
  },
  {
    id: 'food',
    user: true,
   
    validator: (value) => {
      if (isNaN(value)) {
        return 'Please enter quantity';
      } else if (value < 1) {
        return 'Please enter a valid quantity';
      } else {
        return true;
      }
    },
    trigger: '5',
  },
  {
    id: '7',
    options: [
      { value: 'water', label: 'Water', trigger: '6' },
      { value: 'soda', label: 'Soda', trigger: '6' },
      { value: 'juice', label: 'Juice', trigger: '6' },
      { value: 'No', label: 'No', trigger: '8' },
    ],
    shouldTriggerNext: (value, previousValue) => {
      return value !== previousValue;
    },
    waitAction: true,
  },

  {
    id: '6',
    user: true,
    validator: (value) => {
      if (isNaN(value)) {
        return 'Please enter quantity';
      } else if (value < 1) {
        return 'Please enter a valid quantity';
      } else {
        return true;
      }
    },
    trigger: '8',
  },
  {
    id: '8',
    message: 'Great! Your order has been placed. Would you like to order anything else?',
    trigger: '9',
  },
  {
    id: '9',
    options: [
      { value: 'yes', label: 'Yes', trigger: '3' },
      { value: 'no', label: 'No', trigger: '10' },
    ],
  },
  {
    id: '10',
    message: 'Thank you for your order, {previousValue}! We will prepare it right away.',
    end: true,
  },
];

const config = {
  floating: true,
};

const App = () => {
  const [conversationHistory, setConversationHistory] = useState([]);

  const handleEnd = ({ steps, values }) => {
    if (!conversationHistory.length) {
      const newConversationHistory = [
        {
          type: 'user',
          message: values.name,
        },
      ];
      steps.forEach((step) => {
        if (step.message) {
          newConversationHistory.push({
            type: 'bot',
            message: step.message,
          });
        }
      });
      setConversationHistory(newConversationHistory);
    }
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="Nosh-Bot"
          steps={steps}
          {...config}
          botAvatar={botAvatar}
          headerAvatar={botAvatar}
          handleEnd={handleEnd}
        />
        <div className="conversation-container">
          {conversationHistory.map((message, index) => {
            if (message.type === 'user') {
              return (
                <div key={index} className="user-message">
                  <span>{message.message}</span>
                </div>
              );
            } else {
              return (
                <div key={index} className="bot-message">
                  <span>{message.message}</span>
                </div>
              );
            }
          })}
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;