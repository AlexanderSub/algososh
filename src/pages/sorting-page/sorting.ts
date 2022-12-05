import { Dispatch, SetStateAction } from "react"
import { delay, swap } from "../../components/utils/utils"
import { SHORT_DELAY_IN_MS } from "../../constants/delays"
import { ElementStates } from "../../types/element-states"
import { Direction, TArrayNumber } from "../../types/types"

export const bubbleSort = async (arr: TArrayNumber[], direction: Direction, setArray?: Dispatch<SetStateAction<TArrayNumber[]>>) => {
  const { length } = arr
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      arr[j].state = ElementStates.Changing
      arr[j + 1].state = ElementStates.Changing
      if (setArray) setArray([...arr])
      await delay(SHORT_DELAY_IN_MS)
      if ((direction === Direction.Ascending && arr[j].value > arr[j + 1].value) || (direction === Direction.Descending && arr[j].value < arr[j + 1].value)) {
        swap(arr, j, j + 1)
      }
      arr[j].state = ElementStates.Default
    }
    arr[arr.length - i - 1].state = ElementStates.Modified
    if (setArray) setArray([...arr])
  }
  return arr
}

export const selectionSort = async (arr: TArrayNumber[], direction: Direction, setArray?: Dispatch<SetStateAction<TArrayNumber[]>>) => {
  const { length } = arr
  if (length === 0) {
    return arr
  }
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    for (let j = i + 1; j < length; j++) {
      arr[i].state = ElementStates.Changing
      arr[j].state = ElementStates.Changing
      if (setArray) setArray([...arr])
      await delay(SHORT_DELAY_IN_MS)
      if ((direction === Direction.Descending && arr[j].value > arr[maxInd].value) || (direction === Direction.Ascending && arr[j].value < arr[maxInd].value)) {
        maxInd = j
      }
      arr[j].state = ElementStates.Default
      if (setArray) setArray([...arr])
    }
    swap(arr, i, maxInd)
    arr[i].state = ElementStates.Modified
  }
  arr[arr.length - 1].state = ElementStates.Modified
  if (setArray) setArray([...arr])
  return arr
};