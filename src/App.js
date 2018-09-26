import React, {Component} from 'react';
import './App.css';
import Store from './Store';
import AuthService from './AuthService';
import DestinationList from './DestinationList';
import SignInDialog from './SignInDialog';
import firebase from 'firebase/app';
import {from as observableFrom} from 'rxjs';
import {switchMap} from 'rxjs/operators';

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
    this.state = {};

    this.onDestinationCreate = this.onDestinationCreate.bind(this);
    this.onDestinationDelete = this.onDestinationDelete.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    this.currentUserSubscription = this.authService.currentUser$.subscribe(
      user => this.setState({user}),
    );
    this.authService.currentUser$
      .pipe(switchMap(u => (u ? this.store.destinations$ : observableFrom([]))))
      .subscribe(destinations => this.setState({destinations}));
  }

  componentWillUnmount() {
    this.currentUserSubscription.unsubscribe();
    this.destinationsSubscription.unsubscribe();
  }

  onDestinationCreate(dest) {
    this.store.createDestination(dest);
  }

  onDestinationDelete(dest) {
    this.store.deleteDestination(dest.id);
  }

  handleSignOut() {
    this.authService.signOut();
  }

  render() {
    let body;
    if (!this.state.user) {
      body = <SignInDialog authService={this.authService} />;
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
          <h1 className="App-title">Lunchtime</h1>
        </header>

        <div className="App-body">{body}</div>
      </div>
    );
  }
}

export default App;
