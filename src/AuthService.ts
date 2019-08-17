import firebase from "firebase/app";
import "firebase/auth";
import { Observable, Subscriber } from "rxjs";
import { share, startWith, switchMap } from "rxjs/operators";

import { User } from "./interfaces";
import { GroupRepository } from "./store";

class AuthService {
  private _groupRepo: GroupRepository = new GroupRepository();

  firebaseAuth: firebase.auth.Auth;
  currentUser$: Observable<User | null>;

  constructor() {
    this.firebaseAuth = firebase.auth();

    this.currentUser$ = new Observable(
      (obs: Subscriber<firebase.User | null>) => {
        this.firebaseAuth.onAuthStateChanged(user => {
          obs.next(user);
        });
      }
    ).pipe(
      switchMap((user: firebase.User | null) => {
        if (user == null) return [null];
        return new Observable((sub: Subscriber<User>) => {
          this._groupRepo.getGroupMembership(user.uid).then(
            groups => sub.next({ ...user, groups }),
            err => {
              console.error("error fetching groups", err);
              sub.next({
                ...user,
                groups: []
              });
            }
          );
        });
      }),
      startWith(null),
      share()
    );
  }

  async signOut() {
    await this.firebaseAuth.signOut();
  }
}

export default AuthService;
