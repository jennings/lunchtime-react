import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Store from './Store';
import DestinationList from './DestinationList';
import SignInDialog from './SignInDialog';
import firebase from 'firebase/app';

firebase.initializeApp({
  apiKey: 'AIzaSyAZv3xYRqBQTuPN02gy6zz25C0LUgpZ6zU',
  authDomain: 'lunchtime-react-95b31.firebaseapp.com',
  projectId: 'lunchtime-react-95b31',
});

class App extends Component {
  constructor() {
    super();
    this.store = new Store();

    this.state = {
      loading: true,
      user: firebase.auth().currentUser,
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

  handleSignIn({user}) {
    this.setState({user});
  }

  render() {
    let body;
    if (!this.state.user) {
      body = <SignInDialog onSignIn={e => this.handleSignIn(e)} />;
    } else if (this.state.loading) {
      body = (
        <div>
          <p>Signed in as: {this.state.user.displayName}</p>
          <p>Loading data...</p>
        </div>
      );
    } else {
      body = (
        <div>
          <p>Signed in as: {this.state.user.displayName}</p>
          <DestinationList
            destinations={this.state.destinations}
            onCreate={this.onDestinationCreate}
            onDelete={this.onDestinationDelete}
          />
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className="App-body">{body}</div>
      </div>
    );
  }
}

export default App;