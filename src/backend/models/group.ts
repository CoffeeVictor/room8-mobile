import { CostItemDTO } from "../../components/CostItem";
import { ShoppingItem } from "../../screens/Shopping-List/ItemList";
import { TaskItem } from "../../screens/To-do/ItemList";

export interface IGroup {
  id?: string;
  name: string;
  users?: string[];
  costList?: CostItemDTO[];
  taskList?: TaskItem[];
  shoppingList?: ShoppingItem[];
}
