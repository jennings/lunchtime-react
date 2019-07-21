import firebase from "firebase/app";
import "firebase/firestore";
import { Observable, Observer } from "rxjs";
import { share } from "rxjs/operators";

export interface Destination {
  id: string;
  name: string;
}

class Store {
  private _db: firebase.firestore.Firestore;
  readonly destinations$: Observable<Destination[]>;

  constructor() {
    this._db = firebase.firestore();

    this.destinations$ = Observable.create(
      (observer: Observer<Destination[]>) => {
        const unsubscribe = this._db
          .collection("destinations")
          .onSnapshot(querySnapshot => {
            const destinations = [] as Destination[];
            querySnapshot.forEach(doc =>
              destinations.push({
                id: doc.id,
                ...doc.data()
              } as Destination)
            );
            observer.next(destinations);
          });
        return unsubscribe;
      }
    ).pipe(share());
  }

  async createDestination(dest: Destination) {
    await this._db.collection("destinations").add(dest);
  }

  deleteDestination(id: string) {
    return this._db
      .collection("destinations")
      .doc(id)
      .delete();
  }
}

export default Store;
