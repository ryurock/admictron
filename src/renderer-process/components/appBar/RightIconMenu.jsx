import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class AppBarRightIconMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "Guest",
        thumbnail: null
      }
    }
  }

  componentDidMount() {
    let setState = this.setState
    const ipc = require('electron').ipcRenderer
    ipc.on('auth-reply', (event, arg) => {
      this.setState({user: arg.user})
    })
  }

  render() {
    return (
      <ul className="app-bar-right">
        <li className="app-bar-right-list">
          <Avatar
            src={this.state.user.thumbnail}
            size={40}
          />
        </li>
        <li className="app-bar-right-list">
          <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText={this.state.user.name} disabled={true} />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
          </IconMenu>
        </li>
      </ul>
    );
  }
}
export default AppBarRightIconMenu
