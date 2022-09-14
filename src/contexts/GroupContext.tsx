import { arrayUnion} from "firebase/firestore";
import { useUser } from "./UserContext";
import { IGroup } from "../backend/models/group";
import { GroupRepository } from "../backend/repositories/groupRepository";
import { createContext, useContext, useState } from "react";

interface IGroupValue {
  group: IGroup | null,
  setActiveGroup: (userDocID: string) => Promise<void>,
  getGroup: (groupDocID: string) => Promise<IGroup | null | undefined>,
  getAllGroups: () => Promise<any[] | undefined>,
  getGroupByUser: (userDocID: string) => Promise<IGroup | null | undefined>,
  createGroup: (newGroup: IGroup) => Promise<void>,
  addUserToGroup: (groupDocID: string, usersDocID: string[]) => Promise<void>,
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
      setGroup(activeGroup);
    }

  }

  const getGroup = async (groupDocID: string) => {
    
    try {
      const docSnap = await groupRepository.getGroup(groupDocID);

      const data = docSnap.exists() ? docSnap.data() : null;

      if (data === null || data === undefined) return null;

      return data as IGroup;
      
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
        .then(() => {
          console.log('Group created!');
        });
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

  const value = {
    group,
    setActiveGroup,
    getGroup,
    getAllGroups,
    getGroupByUser,
    createGroup,
    addUserToGroup,
  }

  return (
      <GroupContext.Provider value={value}>
          {children}
      </GroupContext.Provider>
  )
}
