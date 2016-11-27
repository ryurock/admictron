import React from 'react'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

class LeftDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClose() {
    this.props.onLeftDrawerMenuItemCloseTouchTap();
  }

  render() {
    return (
      <div>
        <Drawer
          docked={false}
          open={this.props.open}
        >
          <MenuItem
            primaryText="Menu Close"
            leftIcon={<NavigationClose />}
            onTouchTap={this.handleClose.bind(this)}
          />
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}
export default LeftDrawer
