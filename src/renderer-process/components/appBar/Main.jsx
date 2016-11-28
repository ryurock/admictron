import React from 'react'

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
      <div id="app-bar">
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
    )
  }
}
export default AppBarMain
