// @see https://github.com/callemall/material-ui/issues/4758
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import React from 'react'
import ReactDOM from 'react-dom';

import AppBarMain from './components/appBar/Main.jsx'

const ipc = require('electron').ipcRenderer
ipc.send('auth', 'ping')

ReactDOM.render(
  <AppBarMain />,
  document.getElementById('app')
);

