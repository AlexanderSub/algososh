import React, { ChangeEvent, SetStateAction, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { ElementStates } from "../../types/element-states";
import PagesStyles from '../pages.module.css'
import { LinkedList } from "./LinkedList";
import ListPageStyles from './list-page.module.css'

export const ListPage: React.FC = () => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, setInput: {(value: SetStateAction<string>): void}) => {
    setInput((e.target as HTMLInputElement).value)
  }

  const initialArray = Array.from({length: 4}, () => Math.floor(Math.random() * 100));

  const [list] = useState(new LinkedList(initialArray))
  const [input, setInput] = useState<string>('')
  const [index, setIndex] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [element, setElement] = useState()

  const addToHead = () => {

  }

  const addToTail = () => {

  }

  

  return (
    <SolutionLayout title="Связный список">
      <div className={ListPageStyles.wrapper}>

          <Input 
            placeholder="Введите значение"
            maxLength={4}
            isLimitText
            type="text"
            value={input}
            onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>, setInput)}
            // disabled={queue.getSize() === queue.getLength()}
            extraClass={ListPageStyles.inputValue}
          />
          <Button 
            text="Добавить в head"
            // onClick={() => enqueue(input)}
            disabled={!input}
            extraClass={ListPageStyles.buttonAddToHead}
          />
          <Button 
            text="Добавить в tail"
            // onClick={() => dequeue()}
            // disabled={!queue.getLength() || disableDelete}
            extraClass={ListPageStyles.buttonAddToTail}
          />
          <Button 
            text="Удалить из head"
            // onClick={() => enqueue(input)}
            disabled={!input}
            extraClass={ListPageStyles.buttonDeleteFromHead}
          />
          <Button 
            text="Удалить из tail"
            // onClick={() => dequeue()}
            // disabled={!queue.getLength() || disableDelete}
            extraClass={ListPageStyles.buttonDeleteFromTail}
          />

          <Input 
            placeholder="Введите индекс"
            type="text"
            value={input}
            onChange={(e) => handleChange(e as ChangeEvent<HTMLInputElement>, setInput)}
            // disabled={queue.getSize() === queue.getLength()}
            extraClass={ListPageStyles.inputIndex}
          />
          <Button 
            text="Добавить по индексу"
            // onClick={() => enqueue(input)}
            disabled={!input}
            extraClass={ListPageStyles.buttonAddByIndex}
          />
          <Button 
            text="Удалить по индексу"
            // onClick={() => dequeue()}
            // disabled={!queue.getLength() || disableDelete}
            extraClass={ListPageStyles.buttonDeleteByIndex}
          />


        <div className={PagesStyles.output}>
          {/* {symbols.map((item, index) => 
            <Circle 
              key={index}
              letter={item}
              index={index}
              state={index === count ? ElementStates.Changing : ElementStates.Default}
              head={item && index === head ? "head" : ""}
              tail={item === (tail).toString() ? "tail" : ""}
            />
          )} */}
        </div>
      </div>
    </SolutionLayout>
  );
};
