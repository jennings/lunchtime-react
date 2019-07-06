import React, { Component } from "react";
import "./App.css";
import Store from "./Store";
import AuthService from "./AuthService";
import DestinationList from "./DestinationList";
import Picker from "./Picker";
import SignInDialog from "./SignInDialog";
import firebase from "firebase/app";
import { from as observableFrom, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Destination } from "./Store";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
});

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Lunchtime</h1>
      </header>

      <div className="App-body-container">
        <div className="App-body">
          <Home />
        </div>
      </div>
    </div>
  );
}

class Home extends Component<unknown, any> {
  private store: Store;
  private authService: AuthService;
  private currentUserSubscription: Subscription | null = null;
  private destinationsSubscription: Subscription | null = null;

  constructor(props: unknown) {
    super(props);
    this.store = new Store();
    this.authService = new AuthService();
    this.state = {};

    this.onDestinationCreate = this.onDestinationCreate.bind(this);
    this.onDestinationDelete = this.onDestinationDelete.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    this.currentUserSubscription = this.authService.currentUser$.subscribe(
      (user: any) => this.setState({ user })
    );
    this.authService.currentUser$
      .pipe(switchMap(u => (u ? this.store.destinations$ : observableFrom([]))))
      .subscribe((destinations: any) => this.setState({ destinations }));
  }

  componentWillUnmount() {
    const sub = this.currentUserSubscription;
    if (sub) sub.unsubscribe();
    const sub2 = this.destinationsSubscription;
    if (sub2) sub2.unsubscribe();
  }

  onDestinationCreate(dest: Destination) {
    this.store.createDestination(dest);
  }

  onDestinationDelete(dest: Destination) {
    this.store.deleteDestination(dest.id);
  }

  handleSignOut() {
    this.authService.signOut();
  }

  render() {
    if (!this.state.user) {
      return <SignInDialog authService={this.authService} />;
    } else if (this.state.destinations == null) {
      return (
        <div>
          <p>
            Signed in as: {this.state.user.displayName}
            <button onClick={this.handleSignOut}>Sign out</button>
          </p>
          <p>Loading data...</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>
            Signed in as: {this.state.user.displayName}
            <button onClick={this.handleSignOut}>Sign out</button>
          </p>

          <h1>Pick a place</h1>
          <Picker destinations={this.state.destinations} />

          <h1>Edit places</h1>
          <DestinationList
            destinations={this.state.destinations}
            onCreate={this.onDestinationCreate}
            onDelete={this.onDestinationDelete}
          />
        </div>
      );
    }
  }
}
