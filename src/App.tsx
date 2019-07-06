import React, { Component, useEffect, useState } from "react";
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

const store = new Store();
const authService = new AuthService();

function Home() {
  const [user, setUser] = useState();
  const [destinations, setDestinations] = useState(null);

  useEffect(() => {
    const sub = authService.currentUser$.subscribe(setUser);
    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    const sub = authService.currentUser$
      .pipe(switchMap(u => (u ? store.destinations$ : observableFrom([]))))
      .subscribe(setDestinations);
    return () => sub.unsubscribe();
  }, []);

  const onDestinationCreate = (dest: Destination) => {
    store.createDestination(dest);
  };

  const onDestinationDelete = (dest: Destination) => {
    store.deleteDestination(dest.id);
  };

  const handleSignOut = () => {
    authService.signOut();
  };

  if (!user) {
    return <SignInDialog authService={authService} />;
  }

  let body;
  if (destinations == null) {
    body = <p>Loading data...</p>;
  } else {
    body = (
      <>
        <h1>Pick a place</h1>
        <Picker destinations={destinations} />

        <h1>Edit places</h1>
        <DestinationList
          destinations={destinations}
          onCreate={onDestinationCreate}
          onDelete={onDestinationDelete}
        />
      </>
    );
  }

  return (
    <div>
      <p>
        Signed in as: {user.displayName}
        <button onClick={handleSignOut}>Sign out</button>
      </p>
      {body}
    </div>
  );
}
