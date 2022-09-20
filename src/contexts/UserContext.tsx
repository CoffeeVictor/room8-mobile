import { IUser } from '../backend/models/user';
import { UserRepository } from "../backend/repositories/userRepository";
import { createContext, useContext, useState } from "react";
import { DocumentData } from 'firebase/firestore';

const userRepository = new UserRepository();

interface IUserValue {
  user: any,
  setActiveUser: (userDocID: string) => Promise<void>,
  getUser: (userDocID: string) => Promise<DocumentData | null | undefined>,
  getAllUsers: () => Promise<any[] | undefined>,
  getUserByEmail: (email: string) => Promise<any[] | undefined>,
  getUsersByGroup: (groupDocID: string) => Promise<any[] | undefined>,
  createUser: (newUser: IUser) => Promise<void>,
  addGroupToUser: (groupDocID: string, usersDocID: string) => Promise<void>,
}

const UserContext = createContext<IUserValue | null>(null);

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider: React.FC = ({children}) => {

  const [user, setUser] = useState<any | null>(null);

  const setActiveUser = async (userDocID: string) => {

    const activeUser = await getUser(userDocID);

    if (activeUser) {
      setUser(activeUser)
    }

  }

  const getUser = async (userDocID: string) => {
    
    try {
      const docSnap = await userRepository.getUser(userDocID);

      const data = docSnap.exists() ? docSnap.data() : null;

      if (data === null || data === undefined) return null;

      return data;
      
    } catch (e) {
      console.error("getUser", e);
    }
     
  };

  const getAllUsers = async () => {
    
    try {
      return await userRepository.getAllUsers()
        .then(users => {
          let usersData: any[] = [];
          users.forEach(doc => usersData.push( doc.data() ? doc.data() : { } ));
          return usersData;
      });
      
    } catch (e) {
      console.error("getAllUsers", e);
    }
  };

  const getUserByEmail = async (email: string) => {
    
    try {
      return await userRepository.getUserBy('email', email)
        .then(users => {
          let usersData: any[] = [];
          users.forEach(doc => usersData.push( doc.data() ? doc.data() : { } ));
          return usersData;
      });
      
    } catch (e) {
      console.error("getUserByEmail", e);
    }
    
  };

  const getUsersByGroup = async (groupDocID: string) => {
    
    try {
      return await userRepository.getUserBy('group', groupDocID)
        .then(users => {
          let usersData: any[] = [];
          users.forEach(doc => usersData.push( doc.data() ? doc.data() : { } ));
          return usersData;
      });
      
    } catch (e) {
      console.error("getUsersByGroup", e);
    }
    
  };

  const createUser = async (newUser: IUser) => {
    
    try {
      return await userRepository.createUser(newUser)
        .then(() => {
          console.log('User added!');
        });
    } catch (e) {
      console.error("createUser", e);
    }
  };

  const addGroupToUser = async (groupDocID: string, usersDocID: string) => {
    
    try {

      return await userRepository.updateUser(usersDocID, {
        group: groupDocID
      })
        .then(() => {
          console.log('Group added!');
        });
    } catch (e) {
      console.error("addGroupToUser", e);
    }
  };

  const value = {
    user,
    setActiveUser,
    getUser,
    getAllUsers,
    getUserByEmail,
    getUsersByGroup,
    createUser,
    addGroupToUser,
  }

  return (
      <UserContext.Provider value={value}>
          {children}
      </UserContext.Provider>
  )
}
