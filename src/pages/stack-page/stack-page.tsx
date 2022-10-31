import React, { ChangeEvent, SetStateAction, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { delay } from "../../components/utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import PagesStyles from '../pages.module.css'
import { Stack } from "./Stack";

export const StackPage: React.FC = () => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, setInput: {(value: SetStateAction<string>): void}) => {
    setInput((e.target as HTMLInputElement).value)
  }

  const [symbols, setSymbols] = useState<string[]>([])
  const [input, setInput] = useState<string>('')
  const [count, setCount] = useState<number>(0)
  const [stack] = useState(new Stack<string>())
  const [disableDelete, setDisableDelete] = useState(false)

  const push = async (item: string) => {
    stack.push(item)
    setSymbols(stack.getElements())
    setInput('')

    await delay(DELAY_IN_MS)
    setCount(count + 1)
  }

  const pop = async () => {
    setDisableDelete(true)
    setCount(stack.getSize() - 1)
    await delay(DELAY_IN_MS)
    stack.pop()
    const array = stack.getElements()
    setSymbols([...array])
    setDisableDelete(false)
  }

  const clear = () => {
    stack.clear()
    setSymbols(stack.getElements)
    setCount(0)
  }

  return (
    <SolutionLayout title="Стек">
      <div className={PagesStyles.wrapper}>
        <div className={`${PagesStyles.input} ${PagesStyles.mb48}`}>
          <Input 
            maxLength={4}
            isLimitText
            type="text"
            value={input}
            onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>, setInput)}
          />
          <Button 
            text="Добавить"
            onClick={() => push(input)}
            disabled={!input}
          />
          <Button 
            text="Удалить"
            onClick={() => pop()}
            disabled={disableDelete || !stack.getSize()}
          />
          <Button 
            text="Очистить"
            extraClass={PagesStyles.lastButton}
            onClick={() => clear()}
            disabled={!stack.getSize()}
          />
        </div>

        <div className={PagesStyles.output}>
          {symbols.map((item, index) => 
            <Circle 
              key={index}
              letter={item}
              index={index}
              state={index === count ? ElementStates.Changing : ElementStates.Default}
              head={stack.getSize() - 1 === index ? "top" : null}
            />
          )}
        </div>
      </div>
    </SolutionLayout>
  );
};
