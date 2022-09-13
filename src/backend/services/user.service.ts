import { IUser } from '../models/User';
import { UserRepository } from "../repositories/user.repository";

const userRepository = new UserRepository();

export class UserService {

  public getUser = async (userDocID: string) => {
    
    try {
      const docSnap = await userRepository.getUser(userDocID);

      const data = docSnap.exists() ? docSnap.data() : null;

      if (data === null || data === undefined) return null;

      return { userDocID, ...data };
      
    } catch (e) {
      return e;
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
      return e;
    }
  };

  public getUserByEmail = async (email: String) => {
    
    try {
      return await userRepository.getUserByEmail(email)
        .then(users => {
          let usersData: any[] = [];
          users.forEach(doc => usersData.push( doc.data() ? doc.data() : { } ));
          return usersData;
      });
      
    } catch (e) {
      return e;
    }
    
  };

  public createUser = async (newUser: IUser) => {
    
    try {
      return await userRepository.createUser(newUser)
        .then(() => {
          console.log('User added!');
        });
    } catch (e) {
      return e;
    }
  };
  
}