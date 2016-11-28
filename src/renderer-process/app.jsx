// @see https://github.com/callemall/material-ui/issues/4758
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React from 'react';
import ReactDOM from 'react-dom';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBarMain from './components/appBar/Main.jsx';
import SampleTable from './components/SampleTable.jsx';

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <div id="wrapper">
      <AppBarMain />
      <SampleTable />
    </div>
  </MuiThemeProvider>,
  document.getElementById('app')
);

