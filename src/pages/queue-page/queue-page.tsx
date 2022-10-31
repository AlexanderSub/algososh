import React, { ChangeEvent, SetStateAction, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { delay } from "../../components/utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./Queue";
import PagesStyles from '../pages.module.css'

export const QueuePage: React.FC = () => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, setInput: {(value: SetStateAction<string>): void}) => {
    setInput((e.target as HTMLInputElement).value)
  }

  const [queue] = useState(new Queue<string>(7))
  const [symbols, setSymbols] = useState<string[] | undefined[]>(queue.getElements())
  const [input, setInput] = useState<string>('')
  const [count, setCount] = useState<number>(-1)
  const [head, setHead] = useState<number>(queue.getHead())
  const [tail, setTail] = useState<number>(queue.getTail())
  const [disableDelete, setDisableDelete] = useState(false)

  const enqueue = async (item: string) => {
    setInput('')
    queue.enqueue(item)
    setSymbols(queue.getElements())
    setTail(queue.getTail())
    setCount(tail % queue.getSize())
    await delay(DELAY_IN_MS)
    setCount(-1)
  }

  const dequeue = async () => {
    setDisableDelete(true)
    queue.dequeue()
    setSymbols(queue.getElements())
    setCount(head & queue.getSize())
    await delay(DELAY_IN_MS)
    setHead(queue.getHead())
    setCount(-1)
    setDisableDelete(false)
  }

  const clear = async () => {
    queue.clear()
    setSymbols(queue.getElements())
    setHead(queue.getHead())
    setTail(queue.getTail())
  }
  
  return (
    <SolutionLayout title="Очередь">
      <div className={PagesStyles.wrapper}>
        <div className={`${PagesStyles.input} ${PagesStyles.mb48}`}>
          <Input 
            maxLength={4}
            isLimitText
            type="text"
            value={input}
            onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>, setInput)}
            disabled={queue.getSize() === queue.getLength()}
          />
          <Button 
            text="Добавить"
            onClick={() => enqueue(input)}
            disabled={!input}
          />
          <Button 
            text="Удалить"
            onClick={() => dequeue()}
            disabled={!queue.getLength() || disableDelete}
          />
          <Button 
            text="Очистить"
            extraClass={PagesStyles.lastButton}
            onClick={() => clear()}
            disabled={head === 0 && tail === 0}
          />
        </div>

        <div className={PagesStyles.output}>
          {symbols.map((item, index) => 
            <Circle 
              key={index}
              letter={item}
              index={index}
              state={index === count ? ElementStates.Changing : ElementStates.Default}
              head={item && index === head ? "head" : ""}
              tail={item && queue.getTail() > 7 ? index === (queue.getTail() - 8) ? "tail" : "" : index === (queue.getTail() - 1) ? "tail" : ""}
            />
          )}
        </div>
      </div>
    </SolutionLayout>
  );
};
