import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Column } from "../../components/ui/column/column";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { delay, swap } from "../../components/utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { TArrayNumber } from "../../types/types";
import PagesStyles from '../pages.module.css'
import { SortType, Step } from "./types";
import { getRandomArray } from "./utils";

export const SortingPage: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Bubble)
  const [array, setArray] = useState<TArrayNumber[]>([])
  const [sortDirection, setSortDirection] = useState<Direction>()
  
  const randomArray = useRef<number[]>(getRandomArray())
  const [steps, setSteps] = useState<Step[]>([{
    currentArray: randomArray.current,
    sortedIndexes: []
  }])
  const [currentStep, setCurrentStep] = useState(0)

  const isAlgorithmInProgress = currentStep < steps.length - 1

  const generateArray = () => {
    randomArray.current = getRandomArray()
    setSteps([{
      currentArray: randomArray.current,
      sortedIndexes: []
    }])
    setCurrentStep(0)
  }


  useEffect(() => {
    generateArray()
  }, [])

  const makeSort = (sortDirection: Direction) => {
    
  }

  const selectionSort = async (type: string) => {
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
  };

  const bubbleSort = (type: string) => {
    
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={PagesStyles.wrapper}>
        <RadioInput 
          label="Выбор"
          disabled={isAlgorithmInProgress}
          checked={sortType === SortType.Select}
          onChange={() => setSortType(SortType.Select)}
        />
        <RadioInput 
          label="Пузырёк"
          disabled={isAlgorithmInProgress}
          checked={sortType === SortType.Bubble}
          onChange={() => setSortType(SortType.Bubble)}
        />
        <Button
          type='submit'
          text='По возрастанию'
          isLoader={sortDirection === 'ascending'}
          disabled={isAlgorithmInProgress}
          onClick={() => sortType === 'select' ? selectionSort('ascending') : bubbleSort('ascending')} 
        />
        <Button
          type='submit'
          text='По убыванию'
          isLoader={sortDirection === 'descending'}
          disabled={isAlgorithmInProgress}
          onClick={() => sortType === 'select' ? selectionSort('descending') : bubbleSort('descending')} 
        />
        <Button
          type='submit'
          text='Новый массив'
          isLoader={false}
          disabled={isAlgorithmInProgress}
          onClick={() => generateArray()} 
        />
      </div>
     <ul className={PagesStyles.output}>
      {
        array.map((number, index) => {
          return (
            <Column key={index} index={number.value} />
          )
        })
      }
     </ul>
    </SolutionLayout>
  );
};
