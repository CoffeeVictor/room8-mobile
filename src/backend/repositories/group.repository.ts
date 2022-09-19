import { collection, addDoc, getDoc, getDocs, doc, DocumentSnapshot, DocumentData, QuerySnapshot, setDoc, query, where, Query, updateDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import { IGroup } from "../models/group";

const groupCollection = collection(db, 'Groups');

export class GroupRepository {
  public getGroup = async (groupDocID: string): Promise<DocumentSnapshot<DocumentData>> => {
    return await getDoc(doc(groupCollection, groupDocID));
  };

  public getAllGroups = async (): Promise<QuerySnapshot<DocumentData>> => {
    return await getDocs(groupCollection);
  };

  public createGroup = async (newGroup: IGroup) => {
    return await addDoc(groupCollection, newGroup);
  };

  public updateGroup = async (groupDocID: string, updateObj: any) => {
    return await updateDoc(doc(groupCollection, groupDocID), updateObj, { merge: true });
  };
}
