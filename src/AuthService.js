import {BehaviorSubject} from 'rxjs';

class AuthService {
  constructor() {
    this._currentUser$ = new BehaviorSubject();
  }

  get currentUser$() {
    return this._currentUser$.asObservable();
  }

  signIn(user) {
    const val = JSON.stringify(user);
    sessionStorage.setItem('currentUser', val);
    this._currentUser$.next(user);
  }

  signOut() {
    sessionStorage.removeItem('currentUser');
    this._currentUser$.next();
  }
}

export default AuthService;
