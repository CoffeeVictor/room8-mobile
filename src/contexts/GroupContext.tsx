import { arrayRemove, arrayUnion } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { IGroup } from "../backend/models/group";
import { GroupRepository } from "../backend/repositories/groupRepository";
import { CostItemDTO } from "../components/CostItem";
import { ShoppingItem } from "../screens/Shopping-List/ItemList";
import { TaskItem } from "../screens/To-do/ItemList";
import { useUser } from "./UserContext";

interface IGroupValue {
  group: IGroup | null,
  setActiveGroup: (userDocID: string) => Promise<void>,
  getGroup: (groupDocID: string) => Promise<IGroup | null | undefined>,
  getAllGroups: () => Promise<any[] | undefined>,
  getGroupByUser: (userDocID: string) => Promise<IGroup | null | undefined>,
  createGroup: (newGroup: IGroup) => Promise<string | undefined>,
  addUserToGroup: (groupDocID: string, usersDocID: string[]) => Promise<void>,
  addCostItemToGroup: (groupDocID: string, item: CostItemDTO) => Promise<void>,
  deleteCostItemById: (groupDocID: string, costItem: CostItemDTO) => Promise<void>,
  addTaskItemToGroup: (groupDocID: string, item: TaskItem) => Promise<void>,
  deleteTaskItemById: (groupDocID: string, item: TaskItem) => Promise<void>,
  addShoppingItemToGroup: (groupDocID: string, item: ShoppingItem) => Promise<void>,
  deleteShoppingItemById: (groupDocID: string, item: ShoppingItem) => Promise<void>,
}

const GroupContext = createContext<IGroupValue | null>(null);

export function useGroup() {
  return useContext(GroupContext);
}

export const GroupProvider: React.FC = ({children}) => {

  const [group, setGroup] = useState<IGroup | null>(null);
  const groupRepository = new GroupRepository();
  const userContext = useUser();

  const setActiveGroup = async (userDocID: string) => {

    const activeGroup = await getGroupByUser(userDocID);

    if (activeGroup) {

      const user = await userContext?.getUser(userDocID);
      activeGroup.id = user?.group;
      console.log('set current group', activeGroup);
      setGroup(activeGroup);
    }

  }

  const getGroup = async (groupDocID: string) => {
    
    try {
      const docSnap = await groupRepository.getGroup(groupDocID);

      const data = docSnap.exists() ? docSnap.data() : null;

      if (data === null || data === undefined) return null;

      return {...data, id: docSnap.id} as IGroup;
      
    } catch (e) {
      console.error("getGroup", e);
    }
     
  };

  const getAllGroups = async () => {
    
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

  const getGroupByUser = async (userDocID: string) => {
    
    try {

      const user = await userContext?.getUser(userDocID);

      if (user && user?.group) {
        return await getGroup(user.group);
      } else {
        console.warn("getGroupByUser: ", `No group found for user Id ${userDocID} or user not found`);
        return;
      }
      
    } catch (e) {
      console.error("getGroupByUser", e);
    }
    
  };

  const createGroup = async (newGroup: IGroup) => {
    
    try {
      return await groupRepository.createGroup(newGroup)
        .then(response => response?.id);
    } catch (e) {
      console.error("createGroup", e);
    }
  };

  const addUserToGroup = async (groupDocID: string, usersDocID: string[]) => {
    
    try {

      return await groupRepository.updateGroup(groupDocID, {
        users: arrayUnion(...usersDocID)
      })
        .then(() => {
          userContext?.addGroupToUser(groupDocID, usersDocID[0])
          console.log('Group updated!');
        });
    } catch (e) {
      console.error("addUserToGroup", e);
    }
  };

  const addCostItemToGroup = async (groupDocID: string, item: CostItemDTO) => {
    try {
      return await groupRepository.updateGroup(groupDocID, {
        costList: arrayUnion(item)
      });
    } catch (e) {
      console.error("addCostItemToGroup", e);
    }
  }

  const deleteCostItemById = async (groupDocID: string, costItem: CostItemDTO) => {
    try {
      return await groupRepository.updateGroup(groupDocID, {
        costList: arrayRemove(costItem)
      });
    } catch (e) {
      console.error("deleteCostItemById", e)
    }
  }

  const addTaskItemToGroup = async (groupDocID: string, item: TaskItem) => {
    try {
      return await groupRepository.updateGroup(groupDocID, {
        taskList: arrayUnion(item)
      });
    } catch (e) {
      console.error("addTaskItemToGroup", e);
    }
  }

  const deleteTaskItemById = async (groupDocID: string, item: TaskItem) => {
    try {
      return await groupRepository.updateGroup(groupDocID, {
        taskList: arrayRemove(item)
      });
    } catch (e) {
      console.error("deleteTaskItemById", e);
    }
  }

  const addShoppingItemToGroup = async (groupDocID: string, item: ShoppingItem) => {
    try {
      return await groupRepository.updateGroup(groupDocID, {
        shoppingList: arrayUnion(item)
      });
    } catch (e) {
      console.error("addShoppingItemToGroup", e);
    }
  }

  const deleteShoppingItemById = async (groupDocID: string, item: ShoppingItem) => {
    try {
      return await groupRepository.updateGroup(groupDocID, {
        shoppingList: arrayRemove(item)
      });
    } catch (e) {
      console.error("deleteShoppingItemById", e);
    }
  }

  const value = {
    group,
    setActiveGroup,
    getGroup,
    getAllGroups,
    getGroupByUser,
    createGroup,
    addUserToGroup,
    addCostItemToGroup,
    deleteCostItemById,
    addTaskItemToGroup,
    deleteTaskItemById,
    addShoppingItemToGroup,
    deleteShoppingItemById
  }

  return (
      <GroupContext.Provider value={value}>
          {children}
      </GroupContext.Provider>
  )
}
