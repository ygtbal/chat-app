import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { db } from './bin/config';
import {addUser} from './users/add';
import {getUserWithRoom, get} from './users/get';
import {deleteUser} from './users/delete';
import router from './routes';


const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



mongoose.connect(`mongodb://${db.host}:${db.port}/${db.name}`, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
  // This will run when client connection on i/o instance.
  io.on('connection', (socket) => {
    console.log('have a new connection!!!');

    socket.on('join', ({ name, room }, callback) => {
      console.log(name, room);
      const error = true;
      // if (error) {
      //   callback({error: true});
      // }
      addUser(socket.id, name, room).then((user) => {
        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name}, has joined`});
        socket.join(user.room);

        callback();

      }).catch((err) => {
        return callback(err.toString());
      })
    });

    socket.on('sendMessage', (message, callback) => {
     get(socket.id).then((user) => {
        io.to(user.room).emit('message', {user: user.name, text: message});
        callback();
      }).catch((err) => {
        return callback(err.toString());
      });
    })

    socket.on('disconnect', () => {
      console.log('user had left');
    });
  });
  app.use(router);
  server.listen(PORT, () => console.log(`Server is listening port ${PORT}`));
}).catch((err) => {
  process.exit(22);
});



