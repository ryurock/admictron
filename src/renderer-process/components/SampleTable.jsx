import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import ActionSearch from 'material-ui/svg-icons/action/search';



export default class SampleTable extends React.Component {
  constructor(props) {
    super(props);
    this.tableData = [
      {
        name: 'John Smith',
        status: 'Employed',
        selected: true,
      },
      {
        name: 'Randal White',
        status: 'Unemployed',
      },
      {
        name: 'Stephanie Sanders',
        status: 'Employed',
        selected: true,
      },
      {
        name: 'Steve Brown',
        status: 'Employed',
      },
      {
        name: 'Joyce Whitten',
        status: 'Employed',
      },
      {
        name: 'Samuel Roberts',
        status: 'Employed',
      },
      {
        name: 'Adam Moore',
        status: 'Employed',
      },
    ];
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: true,
      deselectOnClickaway: false,
      showCheckboxes: true,
      height: '300px',
      tableData: this.tableData
    };
  }

  handleSortable(ev, rowsCount) {
    console.log(ev.target.innerText)
  }

  render() {
    return (
      <Table
        height={this.state.height}
        fixedHeader={this.state.fixedHeader}
        fixedFooter={this.state.fixedFooter}
        selectable={this.state.selectable}
        multiSelectable={this.state.multiSelectable}
      >
        <TableHeader
          displaySelectAll={this.state.showCheckboxes}
          adjustForCheckbox={this.state.showCheckboxes}
          enableSelectAll={this.state.enableSelectAll}
        >
          <TableRow>
            <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
              <Toolbar className="table__toolbar" >
              <ToolbarGroup firstChild={true}>
                <SelectField
                  floatingLabelText="Sort by.."
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                {['ID', 'Name', 'Status'].map( (row, index) => (
                  <MenuItem key={index} value={row} primaryText={row} />
                ))}
                </SelectField>
              </ToolbarGroup>
              <ToolbarGroup>
                <SelectField
                  floatingLabelText="Search by.."
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                {['ID', 'Name', 'Status'].map( (row, index) => (
                  <MenuItem key={index} value={row} primaryText={row} />
                ))}
                </SelectField>
              </ToolbarGroup>
              <ToolbarGroup>
                <ActionSearch style={{marginTop: "33px"}}/>
                <TextField className="table__toolbar__search__text" hintText="Hint Text" />
              </ToolbarGroup>
              </Toolbar>

            </TableHeaderColumn>
          </TableRow>
          <TableRow onCellClick={this.handleSortable.bind(this)}>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={this.state.showCheckboxes}
          deselectOnClickaway={this.state.deselectOnClickaway}
          showRowHover={this.state.showRowHover}
          stripedRows={this.state.stripedRows}
        >
          {this.state.tableData.map( (row, index) => (
            <TableRow key={index} selected={row.selected}>
              <TableRowColumn>{index}</TableRowColumn>
              <TableRowColumn>{row.name}</TableRowColumn>
              <TableRowColumn>{row.status}</TableRowColumn>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    )
  }
}
