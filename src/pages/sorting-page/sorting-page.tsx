import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Column } from "../../components/ui/column/column";
import { RadioInput } from "../../components/ui/radio-input/radio-input";
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { ElementStates } from "../../types/element-states";
import { Direction, SortType, TArrayNumber } from "../../types/types";
import PagesStyles from '../pages.module.css'
import { bubbleSort, selectionSort } from "./sorting";

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

  const handleBubbleSort = (arr: TArrayNumber[], direction: Direction) => {
    setLoading(true)

    bubbleSort(arr, direction, setArray)

    setLoading(false)
    setSortDirection(undefined)
  }

  const handleSelectionSort = (arr: TArrayNumber[], direction: Direction) => {
    setLoading(true)

    selectionSort(arr, direction, setArray)

    setLoading(false)
    setSortDirection(undefined)
  }

  const handleClick = (direction: Direction) => {
    setSortDirection(direction)
    sortType === SortType.Bubble ? handleBubbleSort(array, direction) : handleSelectionSort(array, direction)
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
              data-testid='select'
            />
            <RadioInput 
              label="Пузырёк"
              disabled={loading}
              checked={sortType === SortType.Bubble}
              onChange={() => setSortType(SortType.Bubble)}
              data-testid='bubble'
            />
          </div>
          <Button
            type='submit'
            sorting={Direction.Ascending}
            text='По возрастанию'
            isLoader={sortDirection === Direction.Ascending && loading}
            disabled={sortDirection !== Direction.Ascending && loading}
            onClick={() => handleClick(Direction.Ascending)}
            data-testid='ascending'
          />
          <Button
            type='submit'
            sorting={Direction.Descending}
            text='По убыванию'
            isLoader={sortDirection === Direction.Descending && loading}
            disabled={sortDirection !== Direction.Descending && loading}
            onClick={() => handleClick(Direction.Descending)}
            data-testid='descending'
          />
          <Button
            type='submit'
            text='Новый массив'
            disabled={loading}
            onClick={() => generateArray()}
            extraClass={PagesStyles.lastButton}
          />
        </div>
      
        <div className={PagesStyles.output} data-testid='output'>
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
