import { TArrayNumber } from "../../types/types";

export const delay = (ms:number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const swap = (arr: TArrayNumber[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex].value;
  arr[firstIndex].value = arr[secondIndex].value;
  arr[secondIndex].value = temp;
};