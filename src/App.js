import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {FirebaseAuth} from 'react-firebaseui';

firebase.initializeApp({
  apiKey: 'AIzaSyAZv3xYRqBQTuPN02gy6zz25C0LUgpZ6zU',
  authDomain: 'lunchtime-react-95b31.firebaseapp.com',
  projectId: 'lunchtime-react-95b31',
});

class Store {
  constructor() {
    this.db = firebase.firestore();

    this.db.settings({
      timestampsInSnapshots: true,
    });
  }

  listenForDestinations(observer) {
    const unsubscribe = this.db
      .collection('destinations')
      .onSnapshot(querySnapshot => {
        const changes = querySnapshot.docChanges();
        for (const change of changes) {
          switch (change.type) {
            case 'added':
              observer.onAdded &&
                observer.onAdded({id: change.doc.id, ...change.doc.data()});
              break;
            case 'modified':
              observer.onModified &&
                observer.onModified({id: change.doc.id, ...change.doc.data()});
              break;
            case 'removed':
              observer.onRemoved && observer.onRemoved({id: change.doc.id});
              break;
            default:
              console.log('unrecognized change type', change);
          }
        }
      });
    return {unsubscribe};
  }

  async createDestination(dest) {
    const docRef = await this.db.collection('destinations').add(dest);
    return {id: docRef.id, ...docRef.data()};
  }

  deleteDestination(id) {
    return this.db
      .collection('destinations')
      .doc(id)
      .delete();
  }
}

class App extends Component {
  constructor() {
    super();
    this.store = new Store();

    this.state = {
      loading: true,
      user: firebase.auth().currentUser,
    };

    this.firebaseUiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: result => {
          this.setState({user: result.user});
        },
      },
    };

    this.onDestinationCreate = this.onDestinationCreate.bind(this);
    this.onDestinationDelete = this.onDestinationDelete.bind(this);
  }

  async listenForDestinations() {
    const observer = {
      onAdded: dest => {
        const destinations = [...(this.state.destinations || []), dest];
        this.setState({destinations, loading: false});
      },
      onModified: dest => {
        const destinations = this.state.destinations(d => {
          return d.id === dest.id ? dest : d;
        });
        this.setState({destinations, loading: false});
      },
      onRemoved: dest => {
        const destinations = this.state.destinations.filter(
          d => d.id !== dest.id,
        );
        this.setState({destinations, loading: false});
      },
    };
    this.destinationsSubscription = await this.store.listenForDestinations(
      observer,
    );
  }

  async componentDidMount() {
    await this.listenForDestinations();
  }

  onDestinationCreate(dest) {
    this.store.createDestination(dest);
  }

  onDestinationDelete(dest) {
    this.store.deleteDestination(dest.id);
  }

  render() {
    if (!this.state.user) {
      return (
        <FirebaseAuth
          uiConfig={this.firebaseUiConfig}
          firebaseAuth={firebase.auth()}
        />
      );
    }

    const list = this.state.loading ? (
      <div>Loading...</div>
    ) : (
      <DestinationList
        destinations={this.state.destinations}
        onCreate={this.onDestinationCreate}
        onDelete={this.onDestinationDelete}
      />
    );
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className="App-body">{list}</div>

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
