import React from 'react'
import ReactDOM from 'react-dom';

import Clock from './components/username.jsx'

const ipc = require('electron').ipcRenderer

ipc.send('auth', 'ping')
ipc.on('auth-reply', function (event, arg) {
  console.log(arg)
  document.getElementById('username').innerHTML = arg.user.name
  document.getElementById('userthumb').src = arg.user.thumbnail
})

ReactDOM.render(
  <Clock />,
  document.getElementById('app')
);

