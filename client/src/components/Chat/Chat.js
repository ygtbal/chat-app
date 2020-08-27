import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({location}) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  // it is effected when enpoint and location search is changed
  const ENDPOINT = 'localhost:5000';
  useEffect(() => {
    socket = io(ENDPOINT);

    const {name, room} = queryString.parse(location.search);
    
    setName(name);
    setRoom(room);
    // Emit is using for passing parameters to server side
    socket.emit('join', {name, room}, (err) => {
      if (err) {
        alert(err)
      }
    });

   
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  console.log(message, messages); 

  return (
    <div className="outerContainer">
      <div className="container">
        <input value={message} onChange={(event) => setMessage(event.target.value)} onKeyPress={event => event.key === 'Enter' && sendMessage(event)} />
      </div>
    </div>
  )
}

export default Chat;