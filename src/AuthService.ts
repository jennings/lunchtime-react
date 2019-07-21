import firebase from "firebase/app";
import "firebase/auth";
import { Observable, Observer } from "rxjs";
import { share } from "rxjs/operators";

class AuthService {
  firebaseAuth: firebase.auth.Auth;
  currentUser$: Observable<firebase.User | null>;

  constructor() {
    this.firebaseAuth = firebase.auth();
    this.currentUser$ = Observable.create(
      (observer: Observer<firebase.User | null>) => {
        this.firebaseAuth.onAuthStateChanged(user => {
          observer.next(user);
        });
      }
    ).pipe(share());
  }

  signIn(user: unknown) {}

  async signOut() {
    await this.firebaseAuth.signOut();
  }
}

export default AuthService;
