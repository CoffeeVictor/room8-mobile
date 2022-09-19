import { IUser } from '../models/User';
import { UserRepository } from "../repositories/user.repository";

const userRepository = new UserRepository();

export class UserService {

  public getUser = async (userDocID: string) => {
    
    try {
      const docSnap = await userRepository.getUser(userDocID);

      const data = docSnap.exists() ? docSnap.data() : null;

      if (data === null || data === undefined) return null;

      return data;
      
    } catch (e) {
      console.error("getUser", e);
    }
     
  };

  public getAllUsers = async () => {
    
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

  public getUserByEmail = async (email: string) => {
    
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

  public getUsersByGroup = async (groupDocID: string) => {
    
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

  public createUser = async (newUser: IUser) => {
    
    try {
      return await userRepository.createUser(newUser)
        .then(() => {
          console.log('User added!');
        });
    } catch (e) {
      console.error("createUser", e);
    }
  };

  public addGroupToUser = async (groupDocID: string, usersDocID: string) => {
    
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
  
}
