import { CostItemDTO } from "../../components/CostItem";

export interface IGroup {
  groupDocID?: string;
  name: string;
  users: string[];
  costList?: CostItemDTO[];
}
