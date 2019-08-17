import firebase from "firebase/app";
import "firebase/firestore";
import { Observable, Observer, PartialObserver, Subscription } from "rxjs";
import { Destination, DestinationInfo } from "../interfaces";

export class DestinationRepository {
  private _db: firebase.firestore.Firestore;

  constructor() {
    this._db = firebase.firestore();

  }
  subscribe(groupId: string, observer: PartialObserver<Destination[]>): Subscription {
    return Observable.create(
      (observer: Observer<Destination[]>) => {
        const unsubscribe = this._db
          .collection("destinations")
          .where("groupId", "==", groupId)
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
    ).subscribe(observer);
  }

  async createDestination(dest: DestinationInfo) {
    await this._db.collection("destinations").add(dest);
  }

  deleteDestination(id: string) {
    return this._db
      .collection("destinations")
      .doc(id)
      .delete();
  }
}
