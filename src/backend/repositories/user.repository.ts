import { collection, addDoc, getDoc, getDocs, doc, DocumentSnapshot, DocumentData, QuerySnapshot, setDoc, query, where, Query } from "firebase/firestore";
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

  public getUserByEmail = async (email: String): Promise<QuerySnapshot<DocumentData>> => {
    const q = query(usersCollection, where("email", "==", email));
    return await getDocs(q);
  };

  public createUser = async (newUser: IUser) => {
    let {id, ...newUserM} = newUser;
    return await setDoc(doc(usersCollection, newUser.id), newUserM);
  };
  
}
