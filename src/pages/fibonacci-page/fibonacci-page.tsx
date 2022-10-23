import React, { ChangeEvent, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from "../../components/ui/solution-layout/solution-layout";
import { delay } from "../../components/utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import PagesStyles from '../pages.module.css'

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>()
  const [loading, setLoading] = useState(false)
  const [numbers, setNumbers] = useState<number[]>([])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = + e.target.value
    setInputValue(value)
    if (value > 19) {
      setInputValue(19)
    }
  }

  const getFibonacciNumbers = async (n: number) => {
    setLoading(true)
    const fibonacciArray: number[] = [0, 1]
    for (let i = 2; i < n + 1; i++) {
      fibonacciArray.push(fibonacciArray[i - 2] + fibonacciArray[i - 1])
    }
    const buffer: number[] = []
    for (let num of fibonacciArray) {
      buffer.push(num);
      setNumbers([...buffer])
      await delay(DELAY_IN_MS)
    }
    setLoading(false)
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={PagesStyles.content}>
        <div className={`${PagesStyles.input} ${PagesStyles.mb48}`}>
          <Input
            onChange={onChange}
            value={inputValue}
            min={1}
            max={19}
            disabled={loading}
            isLimitText={true}
            type='number'
            extraClass={PagesStyles.inputWidth}
          />
          <Button
            type='submit'
            text='Рассчитать'
            isLoader={loading}
            disabled={!inputValue}
            onClick={() => getFibonacciNumbers(inputValue as number)}
          />
        </div>
        <div className={PagesStyles.output}>
          {
            numbers.map((number, index) => {
              return (
                <Circle key={index} letter={number.toString()} />
              )
            })
          }
        </div>
      </div>
    </SolutionLayout>
  );
};
