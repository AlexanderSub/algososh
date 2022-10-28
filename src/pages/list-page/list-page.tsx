import React, { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { ElementStates } from "../../types/element-states";
import { TListState } from "../../types/types";
import { LinkedList } from "./LinkedList";
import ListPageStyles from './list-page.module.css'

export const ListPage: React.FC = () => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, setInput: {(value: SetStateAction<string>): void}) => {
    setInput((e.target as HTMLInputElement).value)
  }

  const initialArray = Array.from({length: 4}, () => Math.floor(Math.random() * 100)).map(item => item.toString());
  
  const [list] = useState(new LinkedList(initialArray))
  const [listState, setListState] = useState<TListState<typeof input>[]>([])
  const [input, setInput] = useState<string>('')
  const [index, setIndex] = useState<string>('')
  const [addToHeadLoading, setAddToHeadLoading] = useState(false)
  const [addToTailLoading, setAddToTailLoading] = useState(false)
  const [deleteFromHeadLoading, setDeleteFromHeadLoading] = useState(false)
  const [deleteFromTailLoading, setDeleteFromTailLoading] = useState(false)
  const [addByIndexLoading, setAddByIndexLoading] = useState(false)
  const [deleteByIndexLoading, setDeleteByIndexLoading] = useState(false)
  const [element, setElement] = useState()
  
  const setState = () => {
    const array: TListState<typeof input>[] = []
    const circles = list.toArray()
    for (let i = 0; i < circles.length; i++) {
      array.push({
        circle: circles[i],
        smallCircle: '',
        state: ElementStates.Default,
        addProgress: false,
        deleteProgress: false
      })
    }
    return array
  }

  useEffect(() => {
    setListState([...setState()])
  }, [])

  console.log(listState)

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


        <div className={ListPageStyles.output}>
          {listState.map((item, index) => 
            <Circle 
              key={index}
              letter={item.circle}
              index={index}

            />
          )}
        </div>
      </div>
    </SolutionLayout>
  );
};
