import { arrayRemove, arrayUnion } from "firebase/firestore";
import { CostItemDTO } from "../../components/CostItem";
import { IGroup } from "../models/group";
import { GroupRepository } from "../repositories/group.repository";
import { UserService } from "./user.service";

const groupRepository = new GroupRepository();
const userService = new UserService();

export class GroupService {

  public getGroup = async (groupDocID: string) => {
    
    try {
      const docSnap = await groupRepository.getGroup(groupDocID);

      const data = docSnap.exists() ? docSnap.data() : null;

      if (data === null || data === undefined) return null;

      return { groupDocID, ...data };
      
    } catch (e) {
      console.error("getGroup", e);
    }
     
  };

  public getAllGroups = async () => {
    
    try {
      return await groupRepository.getAllGroups()
        .then(groups => {
          let groupsData: any[] = [];
          groups.forEach(doc => groupsData.push( doc.data() ? doc.data() : { } ));
          return groupsData;
      });
      
    } catch (e) {
      console.error("getAllGroups", e);
    }
  };

  public getGroupByUser = async (userDocID: string) => {
    
    try {

      const user = await userService.getUser(userDocID);

      if (user && user?.group) {
        return await this.getGroup(user.group);
      } else {
        console.warn("getGroupByUser: ", `No group found for user Id ${userDocID} or user not found`);
        return;
      }
      
    } catch (e) {
      console.error("getGroupByUser", e);
    }
    
  };

  public createGroup = async (newGroup: IGroup) => {
    
    try {
      return await groupRepository.createGroup(newGroup)
        .then(() => {
          console.log('Group created!');
        });
    } catch (e) {
      console.error("createGroup", e);
    }
  };

  public addUserToGroup = async (groupDocID: string, usersDocID: string[]) => {
    
    try {

      return await groupRepository.updateGroup(groupDocID, {
        users: arrayUnion(...usersDocID)
      })
        .then(() => {
          userService.addGroupToUser(groupDocID, usersDocID[0])
          console.log('Group updated!');
        });
    } catch (e) {
      console.error("addUserToGroup", e);
    }
  };
  
  public addCostItemToGroup = async (groupDocID: string, item: CostItemDTO) => {
    try {
      return await groupRepository.updateGroup(groupDocID, {
        costList: arrayUnion(item)
      });
    } catch (e) {
      console.error("addCostItemToGroup", e);
    }
  }

  public deleteCostItemById = async (groupDocID: string, costItem: CostItemDTO) => {
    try {
      return await groupRepository.updateGroup(groupDocID, {
        costList: arrayRemove(costItem)
      });
    } catch (e) {
      console.error("deleteCostItemById", e)
    }
  }
}
