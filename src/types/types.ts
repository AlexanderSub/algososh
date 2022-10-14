import { ElementStates } from "./element-states";

export type TArrayString = {
  value: string;
  state: ElementStates;
}

export type TArrayNumber = {
  value: number;
  state: ElementStates;  
}

export enum Direction {
  Ascending = "ascending",
  Descending = "descending",
}