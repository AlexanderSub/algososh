import React, { ChangeEvent, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { ArrowIcon } from "../../components/ui/icons/arrow-icon";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { delay } from "../../components/utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TListState } from "../../types/types";
import { LinkedList } from "./LinkedList";
import ListPageStyles from './list-page.module.css'

export const ListPage: React.FC = () => {
  const initialArray = Array.from({length: 4}, () => Math.floor(Math.random() * 100)).map(item => item.toString());
  
  const initialState = () => {
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

  const [list] = useState(new LinkedList(initialArray))
  const [listState, setListState] = useState<TListState<typeof input>[]>(initialState)
  const [input, setInput] = useState<string>('')
  const [index, setIndex] = useState<number>(0)
  const [addToHeadLoading, setAddToHeadLoading] = useState(false)
  const [addToTailLoading, setAddToTailLoading] = useState(false)
  const [deleteFromHeadLoading, setDeleteFromHeadLoading] = useState(false)
  const [deleteFromTailLoading, setDeleteFromTailLoading] = useState(false)
  const [addByIndexLoading, setAddByIndexLoading] = useState(false)
  const [deleteByIndexLoading, setDeleteByIndexLoading] = useState(false)

  const somethingIsLoading = (addToHeadLoading || addToTailLoading || deleteFromHeadLoading || deleteFromTailLoading || addByIndexLoading || deleteByIndexLoading)
  
  const enterValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const enterIndex = (e: ChangeEvent<HTMLInputElement>) => {
    const value = + e.target.value
    setIndex(value)
  }

  const addToHead = async (element: string) => {
    setAddToHeadLoading(true)
    listState[0].smallCircle = element
    listState[0].addProgress = true
    setListState([...listState])
    await delay(DELAY_IN_MS)
    listState[0].smallCircle = ''
    listState[0].addProgress = false
    listState.unshift({
      circle: element,
      smallCircle: '',
      state: ElementStates.Modified,
      addProgress: false,
      deleteProgress: false
    })
    list.prepend(element)
    setListState([...listState])
    await delay(DELAY_IN_MS)
    listState[0].state = ElementStates.Default
    setInput('')
    setAddToHeadLoading(false)
  }

  const addToTail = async (element: string) => {
    setAddToTailLoading(true)
    listState[listState.length - 1].addProgress = true
    listState[listState.length - 1].smallCircle = element
    setListState([...listState])
    await delay(DELAY_IN_MS)
    listState[listState.length - 1].addProgress = false
    listState[listState.length - 1].smallCircle = ''
    listState.push({
      circle: element,
      smallCircle: '',
      state: ElementStates.Modified,
      addProgress: false,
      deleteProgress: false
    })
    list.append(element)
    setListState([...listState])
    await delay(DELAY_IN_MS)
    listState[listState.length - 1].state = ElementStates.Default
    setInput('')
    setAddToTailLoading(false)
  }

  const deleteFromHead = async () => {
    setDeleteFromHeadLoading(true)
    listState[0].deleteProgress = true
    listState[0].smallCircle = listState[0].circle
    listState[0].circle = ''
    setListState([...listState])
    await delay(DELAY_IN_MS)
    listState[0].deleteProgress = false
    listState[0].smallCircle = ''
    listState.shift()
    list.deleteHead()
    setListState([...listState])
    setDeleteFromHeadLoading(false)
  }

  const deleteFromTail = async () => {
    setDeleteFromTailLoading(true)
    listState[listState.length - 1].deleteProgress = true
    listState[listState.length - 1].smallCircle = listState[listState.length - 1].circle
    listState[listState.length - 1].circle = ''
    setListState([...listState])
    await delay(DELAY_IN_MS)
    listState[listState.length - 1].deleteProgress = false
    listState[listState.length - 1].smallCircle = ''
    listState.pop()
    list.deleteTail()
    setListState([...listState])
    setDeleteFromTailLoading(false)
  }

  const addByIndex = async (input: string, index: number) => {
    setAddByIndexLoading(true)
    let currentIndex = 0
    const timer = setInterval(() => {
      if (currentIndex < index + 1) {
        if (currentIndex > 0) {
          listState[currentIndex - 1].addProgress = false
          listState[currentIndex - 1].smallCircle = ''
          listState[currentIndex - 1].state = ElementStates.Changing
        }
        listState[currentIndex].addProgress = true
        listState[currentIndex].smallCircle = input
        setListState([...listState])
        currentIndex++
      } else {
        setTimeout(async() => {
          listState[currentIndex - 1].addProgress = false
          listState[currentIndex - 1].smallCircle = ''
          listState.splice(index, 0, {
            circle: input,
            smallCircle: '',
            state: ElementStates.Modified,
            addProgress: false,
            deleteProgress: false
          })
          for (let i = 0; i < index; i++) {
            listState[i].state = ElementStates.Default
          }
          list.addByIndex(input, index)
          setListState([...listState])
          await delay(DELAY_IN_MS)
          listState[index].state = ElementStates.Default
          setListState([...listState])
          setInput('')
          setAddByIndexLoading(false)
        }, DELAY_IN_MS)
        clearInterval(timer)
      }
    }, DELAY_IN_MS)
  }

  const deleteByIndex = (index: number) => {
    setDeleteByIndexLoading(true)
    let currentIndex = 0
    const timer = setInterval( async () => {
      if (currentIndex < index + 1) {
        listState[currentIndex].state = ElementStates.Changing
        setListState([...listState])
        currentIndex++
      } else {
        setTimeout(async () => {
          listState[currentIndex - 1].state = ElementStates.Default
          listState[currentIndex - 1].deleteProgress = true
          listState[currentIndex - 1].smallCircle = listState[currentIndex - 1].circle
          listState[currentIndex - 1].circle = ''
          setListState([...listState])
          await delay(DELAY_IN_MS)
          listState.splice(index, 1)
          for (let i = 0; i < index; i++) {
            listState[i].state = ElementStates.Default
          }
          list.deleteByIndex(index)
          setListState([...listState])
          setIndex(0)
          setDeleteByIndexLoading(false)
        }, DELAY_IN_MS)
        clearInterval(timer)
      }
    }, DELAY_IN_MS)
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
          onChange={enterValue}
          disabled={somethingIsLoading}
          extraClass={ListPageStyles.inputValue}
        />
        <Button 
          text="Добавить в head"
          onClick={() => addToHead(input)}
          disabled={!input || addToTailLoading}
          isLoader={addToHeadLoading}
          extraClass={ListPageStyles.buttonAddToHead}
        />
        <Button 
          text="Добавить в tail"
          onClick={() => addToTail(input)}
          disabled={!input || somethingIsLoading}
          isLoader={addToTailLoading}
          extraClass={ListPageStyles.buttonAddToTail}
        />
        <Button 
          text="Удалить из head"
          onClick={() => deleteFromHead()}
          disabled={list.getSize() === 0 || somethingIsLoading}
          isLoader={deleteFromHeadLoading}
          extraClass={ListPageStyles.buttonDeleteFromHead}
        />
        <Button 
          text="Удалить из tail"
          onClick={() => deleteFromTail()}
          disabled={list.getSize() === 0 || somethingIsLoading}
          isLoader={deleteFromTailLoading}
          extraClass={ListPageStyles.buttonDeleteFromTail}
        />
        <Input 
          placeholder="Введите индекс"
          type="number"
          value={index}
          onChange={enterIndex}
          disabled={somethingIsLoading}
          max={list.getSize() - 1}
          extraClass={ListPageStyles.inputIndex}
        />
        <Button 
          text="Добавить по индексу"
          onClick={() => addByIndex(input, index)}
          disabled={!input || index < 0 || somethingIsLoading || list.getSize() < index + 1}
          isLoader={addByIndexLoading}
          extraClass={ListPageStyles.buttonAddByIndex}
        />
        <Button 
          text="Удалить по индексу"
          onClick={() => deleteByIndex(index)}
          disabled={index < 0 || somethingIsLoading || list.getSize() < index + 1}
          isLoader={deleteByIndexLoading}
          extraClass={ListPageStyles.buttonDeleteByIndex}
        />
        <div className={ListPageStyles.output}>
          {listState.map((item, index) => 
            <div className={ListPageStyles.circlesWrapper} key={index}>
              <Circle 
                isSmall={true}
                letter={item.smallCircle}
                extraClass={item.addProgress ? `${ListPageStyles.topCircle}` : `${ListPageStyles.topCircle} ${ListPageStyles.hidden}`}
                state={ElementStates.Changing}
              />
              <div className={ListPageStyles.centralCircleWrapper}>
                <Circle 
                  key={index}
                  letter={item.circle}
                  index={index}
                  extraClass={ListPageStyles.centralCircle}
                  head={item.addProgress ? '' : index === 0 ? "head" : ''}
                  tail={item.deleteProgress ? '' : index === list.getSize() - 1 ? "tail" : ''}
                  state={item.state}
                />
                { list.getSize() - 1 === index ? '' :
                  <div className={ListPageStyles.arrow}>
                    <ArrowIcon fill={item.state === ElementStates.Changing ? "#D252E1" : "#0032FF"} />
                  </div> 
                }
              </div>
              <Circle 
                isSmall={true}
                letter={item.smallCircle}
                extraClass={item.deleteProgress ? `${ListPageStyles.bottomCircle}` : `${ListPageStyles.bottomCircle} ${ListPageStyles.hidden}`}
                state={ElementStates.Changing}
              />
            </div>
          )}
        </div>
      </div>
    </SolutionLayout>
  );
};
