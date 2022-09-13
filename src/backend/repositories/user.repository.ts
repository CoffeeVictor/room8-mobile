import { collection, addDoc, getDoc, getDocs, doc, DocumentSnapshot, DocumentData, QuerySnapshot, setDoc, query, where, Query, updateDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import { IUser } from '../models/User';

const usersCollection = collection(db, 'Users');

export class UserRepository {
  public getUser = async (userDocID: string): Promise<DocumentSnapshot<DocumentData>> => {
    return await getDoc(doc(usersCollection, userDocID));
  };

  public getAllUsers = async (): Promise<QuerySnapshot<DocumentData>> => {
    return await getDocs(usersCollection);
  };

  public getUserBy = async (param: String, paramValue: String): Promise<QuerySnapshot<DocumentData>> => {
    const q = query(usersCollection, where(`${param}`, "==", paramValue));
    return await getDocs(q);
  };

  public createUser = async (newUser: IUser) => {
    let {id, ...newUserM} = newUser;
    return await setDoc(doc(usersCollection, newUser.id), newUserM);
  };

  public updateUser = async (userDocID: string, updateObj: any) => {
    return await updateDoc(doc(usersCollection, userDocID), updateObj, { merge: true });
  };
  
}
