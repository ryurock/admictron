import React from 'react'
import ReactDOM from 'react-dom';

import Clock from './components/username.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

const ipc = require('electron').ipcRenderer

ipc.send('auth', 'ping')
ipc.on('auth-reply', function (event, arg) {
  document.getElementById('username').innerHTML = arg.user.name
  document.getElementById('userthumb').src = arg.user.thumbnail
})

ReactDOM.render(
  <div>
    <MuiThemeProvider>
      <RaisedButton label="Default" />
    </MuiThemeProvider>
  </div>,
  document.getElementById('app')
);

