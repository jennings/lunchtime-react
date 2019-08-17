import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect, RouteProps } from "react-router-dom";
import "./App.css";
import { DestinationRepository } from "./store";
import AuthService from "./AuthService";
import DestinationList from "./DestinationList";
import Picker from "./Picker";
import SignInDialog from "./SignInDialog";
import firebase from "firebase/app";
import { User, Destination, Group } from "./interfaces";
import GroupContext from "./GroupContext";
import UserContext from "./UserContext";
import { GroupSelector } from "./GroupSelector";
import { GroupCreateForm } from "./GroupCreateForm";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
});

console.log("DestinationRepository", DestinationRepository)
const store = new DestinationRepository();
const authService = new AuthService();

function ProtectedRoute({ component, ...rest }: RouteProps) {
  const Component = component as React.ReactType;

  const user = useContext<any>(UserContext);
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/sign-in",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const sub = authService.currentUser$.subscribe(setUser);
    return () => sub.unsubscribe();
  }, []);

  const handleSignOut = () => {
    authService.signOut();
  };

  const signOutLink = user ? (
    <p>
      Signed in as: {user.displayName}
      <button onClick={handleSignOut}>Sign out</button>
    </p>
  ) : null;

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Lunchtime</h1>
        </header>

        <div className="App-body-container">
          <div className="App-body">
            {signOutLink}
            <UserContext.Provider value={user}>
              <Switch>
                <ProtectedRoute exact path="/" component={Home} />
                <Route
                  path="/sign-in"
                  render={_ => <SignInDialog authService={authService} />}
                />
              </Switch>
            </UserContext.Provider>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  const user = useContext(UserContext)!;
  const [group, setGroup] = useState<Group | null>(null);
  const [destinations, setDestinations] = useState<Destination[] | null>(null);

  useEffect(() => {
    if (!group) return;
    const sub = store.subscribe(group.id, { next: setDestinations });
    return () => sub.unsubscribe();
  }, [user, group]);

  if (group == null) {
    return (
      <>
        <GroupSelector user={user} onSelect={setGroup} />
        <GroupCreateForm onCreate={setGroup} />
      </>
    );
  }

  if (destinations == null) {
    return <p>Loading data...</p>;
  }

  const onDestinationCreate = (dest: Destination) => {
    store.createDestination(dest);
  };

  const onDestinationDelete = (dest: Destination) => {
    store.deleteDestination(dest.id);
  };

  return (
    <GroupContext.Provider value={group}>
      <h1>Pick a place</h1>
      <Picker destinations={destinations} />

      <h1>Edit places</h1>
      <DestinationList
        groupId={group.id}
        destinations={destinations}
        onCreate={onDestinationCreate}
        onDelete={onDestinationDelete}
      />
    </GroupContext.Provider>
  );
}
