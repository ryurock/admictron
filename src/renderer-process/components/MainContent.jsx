import React from 'react';

import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';

import SampleTable from './SampleTable.jsx';

export default class MainContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: 'table'}
  }

  handleChange(value) {
    this.setState({value: value});
  }

  render () {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
      >
        <Tab className="tab" label="Table" value="table" >
          <SampleTable />
        </Tab>
        <Tab className="tab" label="Tab B" value="b">
          <div>
            <h2>Controllable Tab B</h2>
            <p>
              This is another example of a controllable tab. Remember, if you
              use controllable Tabs, you need to give all of your tabs values or else
              you wont be able to select them.
            </p>
          </div>
        </Tab>
      </Tabs>
    )
  }
}

