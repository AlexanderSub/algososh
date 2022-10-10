import { Step } from "./types";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";

const getIntFromInterval = (max: number, min: number) => {
  return Math.floor (Math.random () * (max - min + 1) + min)
}

// Получение случайного массива
export const getRandomArray = (min = 0, max = 100, minLength = 3, maxLength = 17) => {
  const result = new Array(getIntFromInterval(minLength, maxLength)).fill(0)

  return Array.from(new Set(result.map(() => getIntFromInterval(min, max))))
}

// Сортировка пузырьком
export const getBubbleSortSteps = (sourceArray: number[], direction: Direction = Direction.Ascending): Step[] => {
  const steps: Step[] = []
  let iterationNumber = 0
  let isElementSwapped = false

  do {
    isElementSwapped = false
    for (let i = 0; i < sourceArray.length - 1 - iterationNumber; i++) {
      if (direction === Direction.Ascending ? sourceArray[i] > sourceArray[i + 1] : sourceArray[i] < sourceArray[i + 1]) {
        const tmp = sourceArray[i]
        sourceArray[i] = sourceArray[i + 1]
        sourceArray[i + 1] = tmp
        isElementSwapped = true
      }

      steps.push({
        currentArray: [...sourceArray],
        sortedIndexes: [...(steps[steps.length - 1]?.sortedIndexes || [])],
        aIndex: i,
        bIndex: i + 1
      })
    }
    ++iterationNumber
    //steps.push
  } while (isElementSwapped);
  
  return steps
}

// Получение состояния для конкретного столбца
export const getColumnState = (index: number, maxIndex: number, currentStepNumber: number, currentStep: Step): ElementStates => {
  return ElementStates.Default
}