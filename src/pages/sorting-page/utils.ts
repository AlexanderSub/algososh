import { SortType, Step } from "./types";
import { ElementStates } from "../../types/element-states";

import { Direction, TArrayNumber } from "../../types/types";
import { delay } from "../../components/utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

const getIntFromInterval = (max: number, min: number) => {
  return Math.floor (Math.random () * (max - min + 1) + min)
}

// Получение случайного массива
export const getRandomArray = (min = 0, max = 100, minLength = 3, maxLength = 17) => {
  const result = new Array(getIntFromInterval(minLength, maxLength)).fill(0)

  return Array.from(new Set(result.map(() => getIntFromInterval(min, max))))
}

// Сортировка пузырьком
// export const getBubbleSortSteps = (sourceArray: number[], direction: Direction = Direction.Ascending): Step[] => {
//   const steps: Step[] = []
//   let iterationNumber = 0
//   let isElementSwapped = false

//   do {
//     isElementSwapped = false
//     for (let i = 0; i < sourceArray.length - 1 - iterationNumber; i++) {
//       if (direction === Direction.Ascending ? sourceArray[i] > sourceArray[i + 1] : sourceArray[i] < sourceArray[i + 1]) {
//         const tmp = sourceArray[i]
//         sourceArray[i] = sourceArray[i + 1]
//         sourceArray[i + 1] = tmp
//         isElementSwapped = true
//       }

//       steps.push({
//         currentArray: [...sourceArray],
//         sortedIndexes: [...(steps[steps.length - 1]?.sortedIndexes || [])],
//         aIndex: i,
//         bIndex: i + 1
//       })
//     }
//     ++iterationNumber
//     steps[steps.length - 1].sortedIndexes.push(sourceArray.length - iterationNumber)
//   } while (isElementSwapped);

//   steps.push({
//     currentArray: [...sourceArray],
//     sortedIndexes: steps[steps.length - 1]?.sortedIndexes || []
//   })
  
//   return steps
// }

// Сортировка пузырьком
export const bubbleSort = (arr: number[], direction: Direction) => {
  for (let j = arr.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      if ((direction === 'ascending' && arr[i] > arr[i + 1]) || (direction === 'descending' && arr[i] < arr[i + 1])) {
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }
  return arr
}

// Сортировка выбором
export const selectionSort = (arr: number[], direction: Direction) => {
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    for (let j = i+1; j < length; j++) {
      if ((direction === 'descending' && arr[j] > arr[maxInd]) || (direction === 'ascending' && arr[j] < arr[maxInd])) {
        maxInd = j
      }
    }
    swap(arr, i, maxInd)
  }
  return arr
};

// Получение состояния для конкретного столбца
export const getColumnState = (
    index: number, 
    isLastStep: boolean, 
    currentStep: Step
  ): ElementStates => {
    if ([currentStep.aIndex, currentStep.bIndex].includes(index)) {
      return ElementStates.Changing
    }

    if (currentStep.sortedIndexes.includes(index) || isLastStep) {
      return ElementStates.Modified
    }


  return ElementStates.Default
}