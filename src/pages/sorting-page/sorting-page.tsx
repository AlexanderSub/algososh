import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { ElementStates } from "../../types/element-states";
import { TArrayNumber } from "../../types/types";
import PagesStyles from '../pages.module.css'

export const SortingPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [sorting, setSorting] = useState('select')
  const [array, setArray] = useState<TArrayNumber[]>([])
  const [ascending, setAscending] = useState(false);
  const [descending, setDescending] = useState(false);

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

  const selectionSort = () => {

  }

  const bubbleSort = () => {
    
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={PagesStyles.wrapper}>
        <RadioInput 
          label="Выбор"
          disabled={loading}
          checked={sorting === 'select'}
          onChange={() => setSorting('select')}
        />
        <RadioInput 
          label="Пузырёк"
          disabled={loading}
          checked={sorting === 'bubble'}
          onChange={() => setSorting('bubble')}
        />
        <Button
          type='submit'
          text='По возрастанию'
          isLoader={ascending}
          disabled={loading}
          onClick={() => sorting === 'select' ? selectionSort('ascending') : bubbleSort('ascending')} 
        />
        <Button
          type='submit'
          text='По убыванию'
          isLoader={descending}
          disabled={loading}
          onClick={() => sorting === 'select' ? selectionSort('descending') : bubbleSort('descending')} 
        />
        <Button
          type='submit'
          text='Новый массив'
          isLoader={false}
          disabled={loading}
          onClick={() => generateArray()} 
        />
      </div>
      <ul>

      </ul>
    </SolutionLayout>
  );
};
