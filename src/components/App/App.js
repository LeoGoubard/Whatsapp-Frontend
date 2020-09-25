import React, { useEffect, useState } from 'react';

import Sidebar from '../Sidebar/Sidebar'
import Chat from '../Chat/Chat'
import Pusher from 'pusher-js'
import axios from '../../axios'

import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('messages/sync') 
    .then(response => {
      setMessages(response.data);
    })
  }, [])

  useEffect(() => {
    const pusher = new Pusher(<pusher id>, {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages)

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
        </div>
    </div>
  );
}

export default App;