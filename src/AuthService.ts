import firebase from "firebase/app";
import "firebase/auth";
import { Observable, Observer } from "rxjs";
import { share } from "rxjs/operators";

class AuthService {
  firebaseAuth: firebase.auth.Auth;
  private _currentUser$: Observable<firebase.User | null>;

  constructor() {
    this.firebaseAuth = firebase.auth();
    this._currentUser$ = Observable.create(
      (observer: Observer<firebase.User | null>) => {
        this.firebaseAuth.onAuthStateChanged(user => {
          observer.next(user);
        });
      }
    ).pipe(share());
  }

  get currentUser$() {
    return this._currentUser$;
  }

  signIn(user: unknown) {}

  async signOut() {
    await this.firebaseAuth.signOut();
  }
}

export default AuthService;
