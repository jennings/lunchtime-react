import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Store from './Store';
import AuthService from './AuthService';
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
    this.authService = new AuthService();

    this.state = {
      loading: true,
    };

    this.authService.currentUser$.subscribe(user => {
      this.setState({user});
    });

    this.onDestinationCreate = this.onDestinationCreate.bind(this);
    this.onDestinationDelete = this.onDestinationDelete.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  async listenForDestinations() {
    const observer = {
      added: dest => {
        const destinations = [...(this.state.destinations || []), dest];
        this.setState({destinations, loading: false});
      },
      modified: dest => {
        const destinations = this.state.destinations(d => {
          return d.id === dest.id ? dest : d;
        });
        this.setState({destinations, loading: false});
      },
      removed: dest => {
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
    this.authService.signIn(user);
    this.setState({user});
  }

  handleSignOut() {
    this.authService.signOut();
    this.setState({user: null});
  }

  render() {
    let body;
    if (!this.state.user) {
      body = (
        <SignInDialog
          authService={this.authService}
          onSignIn={this.handleSignIn}
        />
      );
    } else if (this.state.destinations == null) {
      body = (
        <div>
          <p>
            Signed in as: {this.state.user.displayName}
            <button onClick={this.handleSignOut}>Sign out</button>
          </p>
          <p>Loading data...</p>
        </div>
      );
    } else {
      body = (
        <div>
          <p>
            Signed in as: {this.state.user.displayName}
            <button onClick={this.handleSignOut}>Sign out</button>
          </p>
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
