import { Measurement } from '../enums/Measurement';
import { Item } from './Item';

export class Ingredient {
  _id: string;
  item: Item;
  quantity: number;
  measurement: Measurement;
}
