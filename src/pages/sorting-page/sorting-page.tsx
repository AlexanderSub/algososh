import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Column } from "../../components/ui/column/column";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { delay, swap } from "../../components/utils/utils";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Direction, TArrayNumber } from "../../types/types";
import PagesStyles from '../pages.module.css'
import { SortType, Step } from "./types";
import { bubbleSort, selectionSort, getColumnState, getRandomArray } from "./utils";

export const SortingPage: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>()
  const [sortDirection, setSortDirection] = useState<Direction>()
  const [loading, setLoading] = useState(false)

  const [array, setArray] = useState<TArrayNumber[]>([])
  
  
  const randomArray = useRef<number[]>(getRandomArray())
  const [algorithmSteps, setAlgorithmSteps] = useState<Step[]>([{
    currentArray: randomArray.current,
    sortedIndexes: []
  }])
  const [currentAlgorithmStep, setCurrentAlgorithmStep] = useState(0)

  const timer = useRef<NodeJS.Timeout>()

  const generateArray = () => {
    randomArray.current = getRandomArray()
    setAlgorithmSteps([{
      currentArray: randomArray.current,
      sortedIndexes: []
    }])
    setCurrentAlgorithmStep(0)
  }

  useEffect(() => {
    generateArray()
  }, [])

  // const makeSort = (sortDirection: Direction) => {
  //   const steps = getBubbleSortSteps(randomArray.current, sortDirection)
  //   setAlgorithmSteps(steps)

  //   timer.current = setInterval(() => {
  //     if (steps.length > 0) {
  //       setCurrentAlgorithmStep((currentStep) => {
  //         const nextStep = currentStep + 1

  //         if (nextStep > steps.length - 1 && timer.current) {
  //           clearInterval(timer.current)

  //           return currentStep
  //         }

  //         return nextStep
  //       })
  //     }
  //   }, SHORT_DELAY_IN_MS)
  // }

  const handleClick = (direction: Direction) => {
    setSortDirection(direction)
    sortType === SortType.Bubble ? bubbleSort(randomArray.current, direction) : selectionSort(randomArray.current, direction)
  }

  // const selectionSort = async (type: string) => {
    // setLoading(true)
    // setSortDirection(type)

    // const arrayToSort = [...array]

    // console.log(arrayToSort)

    // const { length } = arrayToSort;
    // for (let i = 0; i < length - 1; i++) {
    //   let maxInd = i;
    //   for (let j = i+1; j < length; j++) {
    //     arrayToSort[j].state = ElementStates.Changing
    //     arrayToSort[j + 1].state = ElementStates.Changing
    //     setArray([...arrayToSort])
    //     await delay(DELAY_IN_MS)
    //     if ((sortDirection === 'descending' && arrayToSort[j] > arrayToSort[maxInd]) || (sortDirection === 'ascending' && arrayToSort[j] < arrayToSort[maxInd])) {
    //       maxInd = j
    //     }
    //     arrayToSort[j].state = ElementStates.Default
    //     setArray([...arrayToSort])
    //   }
    //   swap(arrayToSort, i, maxInd)
    //   arrayToSort[i].state = ElementStates.Modified
    // }
    // setLoading(false)
    // setSortDirection('')
  // };

 
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={PagesStyles.wrapper}>
        <div className={PagesStyles.radioButtons}>
          <RadioInput 
            label="Выбор"
            disabled={loading}
            checked={sortType === SortType.Select}
            onChange={() => setSortType(SortType.Select)}
          />
          <RadioInput 
            label="Пузырёк"
            disabled={loading}
            checked={sortType === SortType.Bubble}
            onChange={() => setSortType(SortType.Bubble)}
          />
        </div>
        <div className={PagesStyles.directionButtons}>
          <Button
            type='submit'
            sorting={Direction.Ascending}
            text='По возрастанию'
            isLoader={sortDirection === Direction.Ascending && loading}
            disabled={sortDirection !== Direction.Ascending && loading}
            onClick={() => handleClick(Direction.Ascending)} 
          />
          <Button
            type='submit'
            sorting={Direction.Descending}
            text='По убыванию'
            isLoader={sortDirection === Direction.Descending && loading}
            disabled={sortDirection !== Direction.Descending && loading}
            onClick={() => handleClick(Direction.Descending)} 
          />
        </div>

        <Button
          type='submit'
          text='Новый массив'
          disabled={loading}
          onClick={() => generateArray()}
        />
      </div>
     <ul className={PagesStyles.output}>
      { algorithmSteps.length &&
        algorithmSteps[currentAlgorithmStep].currentArray.map((currentNumber, index) => {
          return (
            <Column 
              key={index} 
              index={currentNumber}
              state={getColumnState(index, currentAlgorithmStep >= algorithmSteps.length - 1, algorithmSteps[currentAlgorithmStep])}
            />
          )
        })
      }
     </ul>
    </SolutionLayout>
  );
};
