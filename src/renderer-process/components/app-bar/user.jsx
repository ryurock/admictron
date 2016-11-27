import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'

class AppBarUser extends React.Component {
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
          <FlatButton label={this.state.user.name} />
        </li>
      </ul>
    );
  }
}

export default AppBarUser
