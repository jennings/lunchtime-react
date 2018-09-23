import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      destinations: [{name: "Teddy's"}, {name: 'Chipotle'}, {name: "Nina's"}],
    };

    this.onDestinationCreate = this.onDestinationCreate.bind(this);
    this.onDestinationDelete = this.onDestinationDelete.bind(this);
  }

  onDestinationCreate(dest) {
    const destinations = [...this.state.destinations, dest];
    this.setState({destinations});
  }

  onDestinationDelete(dest) {
    console.log('deleting', dest);
    const destinations = this.state.destinations.filter(d => d !== dest);
    this.setState({destinations});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className="App-body">
          <DestinationList
            destinations={this.state.destinations}
            onCreate={this.onDestinationCreate}
            onDelete={this.onDestinationDelete}
          />
        </div>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

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
    const destinationItems = this.props.destinations.map(d => (
      <li key={d.name}>
        <button onClick={() => this.handleDeleteDestination(d)}>delete</button>
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

export default App;
