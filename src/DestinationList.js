import React, {Component} from 'react';
import {localeCompareWithSelector} from './util/compare';

class DestinationList extends Component {
  constructor(props) {
    super(props);
    this.handleNewDestination = this.handleNewDestination.bind(this);
    this.handleDeleteDestination = this.handleDeleteDestination.bind(this);
  }

  handleNewDestination(dest) {
    this.props.onCreate(dest);
  }

  handleDeleteDestination(dest) {
    this.props.onDelete(dest);
  }

  render() {
    const destinationItems = this.props.destinations
      .slice()
      .sort(localeCompareWithSelector(d => d.name))
      .map(d => (
        <li key={d.name}>
          <button onClick={() => this.handleDeleteDestination(d)}>
            delete
          </button>
          {d.name}
        </li>
      ));

    return (
      <div>
        <ul>{destinationItems}</ul>
        Add new:
        <br />
        <DestinationAdder onAdd={this.handleNewDestination} />
      </div>
    );
  }
}

class DestinationAdder extends Component {
  constructor(props) {
    super();
    this.state = {value: props.value || ''};
    this.handleInputKeyPress = this.handleInputKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValueChanged = this.handleValueChanged.bind(this);
  }

  handleSubmit() {
    this.props.onAdd({name: this.state.value});
    this.setState({value: ''});
    this.valueInput.focus();
  }

  handleValueChanged(event) {
    this.setState({value: event.target.value});
  }

  handleInputKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render() {
    return (
      <div>
        <label>Name</label>
        <input
          ref={input => (this.valueInput = input)}
          value={this.state.value}
          onChange={this.handleValueChanged}
          onKeyPress={this.handleInputKeyPress}
        />
        <button onClick={this.handleSubmit}>Add</button>
      </div>
    );
  }
}

export default DestinationList;
