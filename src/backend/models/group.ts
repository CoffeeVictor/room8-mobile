import { CostItemDTO } from "../../components/CostItem";

export interface IGroup {
  id?: string;
  name: string;
  users?: string[];
  costList?: CostItemDTO[];
}
