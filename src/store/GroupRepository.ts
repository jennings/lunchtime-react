import firebase from "firebase/app";
import "firebase/firestore";
import { Group, GroupInfo } from "../interfaces";

export class GroupRepository {
  private _db: firebase.firestore.Firestore;

  constructor() {
    this._db = firebase.firestore();
  }

  async createGroup(group: GroupInfo): Promise<Group> {
    const doc = await this._db.collection("groups").add(group);

    return { ...group, id: doc.id };
  }

  addGroupMember(groupId: string, userId: string): Promise<void> {
    return this._db
      .collection("groups")
      .doc(groupId)
      .update({
        users: firebase.firestore.FieldValue.arrayUnion(userId)
      });
  }

  getGroupMembership(uid: string): Promise<Group[]> {
    return this._db
      .collection("groups")
      .where("users", "array-contains", uid)
      .get()
      .then(gs => {
        return gs.docs.map(doc => ({
          ...(doc.data() as GroupInfo),
          id: doc.id
        }));
      });
  }
}
