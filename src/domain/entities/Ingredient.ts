import { Measurement } from "../enums/Measurement";

export class Ingredient {
    _id: string;
    name: string;
    quantity: number;
    measurement: Measurement;
}