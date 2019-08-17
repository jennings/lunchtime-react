import firebase from "firebase";

export interface User extends firebase.UserInfo {
    groups: Group[];
}

export interface Destination {
  id: string;
  name: string;
  groupId: string;
}

export type DestinationInfo = Omit<Destination, "id">;

export interface Group {
  id: string;
  name: string;
  users: string[];
}

export type GroupInfo = Omit<Group, "id">;
