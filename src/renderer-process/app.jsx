// @see https://github.com/callemall/material-ui/issues/4758
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import React from 'react'
import ReactDOM from 'react-dom';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';


import Clock from './components/username.jsx'
import AppBarUser from './components/app-bar/user.jsx'

const ipc = require('electron').ipcRenderer
ipc.send('auth', 'ping')

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <AppBar
      title="Admictron"
      iconElementRight={<AppBarUser />}
    />
  </MuiThemeProvider>,
  document.getElementById('app')
);

