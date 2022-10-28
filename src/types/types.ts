import { ElementStates } from "./element-states";

export type TArrayString = {
  value: string;
  state: ElementStates;
}

export type TArrayNumber = {
  value: number;
  state: ElementStates;  
}

export type TListState<T> = {
  circle: T;
  smallCircle: T;
  state: ElementStates;
  addProgress: boolean;
  deleteProgress: boolean;
}

export enum Direction {
  Ascending = "ascending",
  Descending = "descending",
}

export enum SortType {
  Select = 'select',
  Bubble = 'bubble'
}