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
    message: 'Welcome Order & Enjoy the food in NOSH',
    trigger: '1',
    waitAction: true,
  },
  {
    id: '1',
    message: 'Is this your first order',
    trigger: '2',
    waitAction: true,
  },
    {
    id: '2',
    options: [
      { value: 'Yes', label: 'Yes', trigger: '3' },
      { value: 'No', label: 'No', trigger: '4' },
    ],
    waitAction: true,
  },
  {
    id: '3',
    message: 'thankyou',
    end:true,
  },

   {
    id: '4',
    message: 'May I know your name?',
    trigger: '5',
    waitAction: true,
  },
  {
    id: '5',
    user: true,
    metadata: {
      name: 'name',
      value: '{{{raw}}}'
    },
    trigger: '6',
    waitAction: true,
  },
  {
    id: '6',
    message: 'Would you like to order your previous-order?',
    trigger: '7',
    waitAction: true,
  },
  {
    id: '7',
    options: [
      { value: 'Yes', label: 'Yes', trigger: '8' },
      { value: 'No', label: 'No', trigger: '9' },
    ],
    waitAction: true,
  },
  {
    id: '9',
    message: 'thankyou',
    end:true,
  },
  {
    id: '8',
    message: 'Are you sure? Do you want to order your previous-order?',
    trigger: '10',
    waitAction: true,
  },
  {
    id: '10',
    options: [
      { value: 'Yes', label: 'Yes', trigger: '11' },
      { value: 'No', label: 'No', trigger: '12' },
    ],
    waitAction: true,
  },
  {
    id: '12',
    message: 'thankyou',
    end:true,
  },
  {
    id: '11',
    message: 'Your previous-order is added to cart. Please proceed for the payment',
    end:true,
    waitAction: true,
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