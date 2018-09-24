import firebase from 'firebase/app';
import 'firebase/firestore';

class Store {
  constructor() {
    this.db = firebase.firestore();

    this.db.settings({
      timestampsInSnapshots: true,
    });
  }

  listenForDestinations(observer) {
    const unsubscribe = this.db
      .collection('destinations')
      .onSnapshot(querySnapshot => {
        const changes = querySnapshot.docChanges();
        for (const change of changes) {
          switch (change.type) {
            case 'added':
              observer.onAdded &&
                observer.onAdded({id: change.doc.id, ...change.doc.data()});
              break;
            case 'modified':
              observer.onModified &&
                observer.onModified({id: change.doc.id, ...change.doc.data()});
              break;
            case 'removed':
              observer.onRemoved && observer.onRemoved({id: change.doc.id});
              break;
            default:
              console.log('unrecognized change type', change);
          }
        }
      });
    return {unsubscribe};
  }

  async createDestination(dest) {
    await this.db.collection('destinations').add(dest);
  }

  deleteDestination(id) {
    return this.db
      .collection('destinations')
      .doc(id)
      .delete();
  }
}

export default Store;
