import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Column } from "../../components/ui/column/column";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { delay, swap } from "../../components/utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Direction, SortType, TArrayNumber } from "../../types/types";
import PagesStyles from '../pages.module.css'

export const SortingPage: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Select)
  const [sortDirection, setSortDirection] = useState<Direction>()
  const [loading, setLoading] = useState(false)
  const [array, setArray] = useState<TArrayNumber[]>([])
 
  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const size = Math.random() * (17 - 3) + 3;
    const arr: TArrayNumber[] = [];
    for (let i = 0; i < size; i++) {
      arr.push({
        value: Math.floor(Math.random() * 100) + 1,
        state: ElementStates.Default,
      });
    }
    setArray([...arr]);
  };

// Сортировка пузырьком
const bubbleSort = async (arr: TArrayNumber[], direction: Direction) => {
  setLoading(true)

  const { length } = arr
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      arr[j].state = ElementStates.Changing
      arr[j + 1].state = ElementStates.Changing
      setArray([...arr])
      await delay(SHORT_DELAY_IN_MS)
      if ((direction === 'ascending' && arr[j].value > arr[j + 1].value) || (direction === 'descending' && arr[j].value < arr[j + 1].value)) {
        swap(arr, j, j + 1)
      }
      arr[j].state = ElementStates.Default
    }
    arr[arr.length - i - 1].state = ElementStates.Modified
  }
  setLoading(false)
  setSortDirection(undefined)
}

// Сортировка выбором
const selectionSort = async (arr: TArrayNumber[], direction: Direction) => {
  setLoading(true)
  
  const { length } = arr
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    for (let j = i + 1; j < length; j++) {
      arr[i].state = ElementStates.Changing
      arr[j].state = ElementStates.Changing
      setArray([...arr])
      await delay(SHORT_DELAY_IN_MS)
      if ((direction === 'descending' && arr[j].value > arr[maxInd].value) || (direction === 'ascending' && arr[j].value < arr[maxInd].value)) {
        maxInd = j
      }
      arr[j].state = ElementStates.Default
      setArray([...arr])
    }
    swap(arr, i, maxInd)
    arr[i].state = ElementStates.Modified
  }
  arr[arr.length - 1].state = ElementStates.Modified

  setLoading(false)
  setSortDirection(undefined)
};

  const handleClick = (direction: Direction) => {
    setSortDirection(direction)
    sortType === SortType.Bubble ? bubbleSort(array, direction) : selectionSort(array, direction)
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={PagesStyles.wrapper}>
        <div className={`${PagesStyles.input} ${PagesStyles.mb48}`}>
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
          <Button
            type='submit'
            text='Новый массив'
            disabled={loading}
            onClick={() => generateArray()}
            extraClass={PagesStyles.lastButton}
          />
        </div>
      
        <div className={PagesStyles.output}>
          { array.map((item, index) => {
              return (
                <Column 
                  key={index} 
                  index={item.value}
                  state={item.state}
                />
              )
            })
          }
        </div>
     </div>
    </SolutionLayout>
  );
};
