import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Column } from "../../components/ui/column/column";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { delay, swap } from "../../components/utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TArrayNumber } from "../../types/types";
import PagesStyles from '../pages.module.css'

export const SortingPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [sortType, setSortType] = useState('select')
  const [array, setArray] = useState<TArrayNumber[]>([])
  const [sortDirection, setSortDirection] = useState('');

  const generateArray = () => {
    const randomSize = (max: number, min: number) => Math.floor (Math.random () * (max - min + 1)) + min
    const size = randomSize(17, 3)

    const arr: TArrayNumber[] = []
    for (let i = 0; i < size; i++) {
      arr.push({
        value: Math.floor(Math.random() * 100),
        state: ElementStates.Default
      })
    }
    setArray([...arr])
  }

  useEffect(() => {
    generateArray()
  }, [])

  const selectionSort = async (type: string) => {
    setLoading(true)
    setSortDirection(type)

    const arrayToSort = [...array]

    console.log(arrayToSort)

    const { length } = arrayToSort;
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      for (let j = i+1; j < length; j++) {
        arrayToSort[j].state = ElementStates.Changing
        arrayToSort[j + 1].state = ElementStates.Changing
        setArray([...arrayToSort])
        await delay(DELAY_IN_MS)
        if ((sortDirection === 'descending' && arrayToSort[j] > arrayToSort[maxInd]) || (sortDirection === 'ascending' && arrayToSort[j] < arrayToSort[maxInd])) {
          maxInd = j
        }
        arrayToSort[j].state = ElementStates.Default
        setArray([...arrayToSort])
      }
      swap(arrayToSort, i, maxInd)
      arrayToSort[i].state = ElementStates.Modified
    }
    setLoading(false)
    setSortDirection('')
  };

  const bubbleSort = (type: string) => {
    
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={PagesStyles.wrapper}>
        <RadioInput 
          label="Выбор"
          disabled={loading}
          checked={sortType === 'select'}
          onChange={() => setSortType('select')}
        />
        <RadioInput 
          label="Пузырёк"
          disabled={loading}
          checked={sortType === 'bubble'}
          onChange={() => setSortType('bubble')}
        />
        <Button
          type='submit'
          text='По возрастанию'
          isLoader={sortDirection === 'ascending'}
          disabled={loading}
          onClick={() => sortType === 'select' ? selectionSort('ascending') : bubbleSort('ascending')} 
        />
        <Button
          type='submit'
          text='По убыванию'
          isLoader={sortDirection === 'descending'}
          disabled={loading}
          onClick={() => sortType === 'select' ? selectionSort('descending') : bubbleSort('descending')} 
        />
        <Button
          type='submit'
          text='Новый массив'
          isLoader={false}
          disabled={loading}
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
