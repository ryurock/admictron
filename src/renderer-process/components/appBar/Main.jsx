import React from 'react'

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import AppBarRightIconMenu from './RightIconMenu.jsx'
import LeftDrawer from './LeftDrawer.jsx'

class AppBarMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleTouchLeftDrawer() {
    this.setState({ open: (this.state.open)? false : true });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div id="wrapper">
          <AppBar
            title="Admictron"
            onLeftIconButtonTouchTap={this.handleTouchLeftDrawer.bind(this)}
            iconElementRight={<AppBarRightIconMenu />}
          />
          <LeftDrawer
            open={this.state.open}
            onLeftDrawerMenuItemCloseTouchTap={this.handleTouchLeftDrawer.bind(this)}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}
export default AppBarMain
