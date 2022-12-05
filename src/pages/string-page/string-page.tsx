import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "../../components/ui/button/button";
import { Circle } from "../../components/ui/circle/circle";
import { Input } from "../../components/ui/input/input";
import { SolutionLayout } from '../../components/ui/solution-layout/solution-layout';
import { delay } from "../../components/utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";
import { TArrayString } from "../../types/types";
import PagesStyles from '../pages.module.css'

export const StringPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [string, setString] = useState<TArrayString[]>([])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const reverseString = async () => {
    setLoading(true)
    const stringArray: TArrayString[] = []

    for (let i = 0; i < inputValue.length; i++) {
      stringArray.push(
        {
          value: inputValue[i], 
          state: ElementStates.Default
        }
      )
    }

    setString(stringArray)

    let buffer = ''

    for (let i = 0; i < Math.round(stringArray.length/2); i++) { 
      stringArray[i].state = ElementStates.Changing;
      stringArray[stringArray.length - 1 - i].state = ElementStates.Changing
      await delay(DELAY_IN_MS).then(() => { setString([...stringArray]) })
      buffer = stringArray[i].value
      stringArray[i].value = stringArray[stringArray.length - 1 - i].value
      stringArray[stringArray.length - 1 - i].value = buffer
      stringArray[i].state = ElementStates.Modified
      stringArray[stringArray.length - 1 - i].state = ElementStates.Modified;
    }
    
    await delay(DELAY_IN_MS).then(() => {setString([...stringArray])})

    setLoading(false);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await reverseString()
  }

  return (
    <SolutionLayout title="Строка">
      <div className={PagesStyles.content}>
        <div className={`${PagesStyles.input} ${PagesStyles.mb120}`}>
          <Input
            onChange={onChange}
            value={inputValue}
            maxLength={11}
            disabled={loading}
            isLimitText={true}
            extraClass={PagesStyles.inputWidth}
            data-testid='input'
          />
          <Button
            type='submit'
            text='Развернуть'
            isLoader={loading}
            disabled={!inputValue}
            onClick={handleSubmit} 
            data-testid='button'
          />
        </div>
        <div className={PagesStyles.output} data-testid='output'>
          {
            string.map((letter, index) => {
              return (
                <Circle key={index} state={letter.state} letter={letter.value} />
              )
            })
          }
        </div>
      </div>
    </SolutionLayout>
  )
}
