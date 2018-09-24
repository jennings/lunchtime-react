import firebase from 'firebase/app';
import 'firebase/firestore';

const noopObserver = {
  added() {},
  modified() {},
  removed() {},
};

class Store {
  constructor() {
    this.db = firebase.firestore();

    this.db.settings({
      timestampsInSnapshots: true,
    });
  }

  listenForDestinations(observer) {
    observer = {...noopObserver, ...observer};
    const unsubscribe = this.db
      .collection('destinations')
      .onSnapshot(querySnapshot => {
        const changes = querySnapshot.docChanges();
        for (const change of changes) {
          switch (change.type) {
            case 'added':
              observer.added &&
                observer.added({id: change.doc.id, ...change.doc.data()});
              break;
            case 'modified':
              observer.modified &&
                observer.modified({id: change.doc.id, ...change.doc.data()});
              break;
            case 'removed':
              observer.removed && observer.removed({id: change.doc.id});
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
