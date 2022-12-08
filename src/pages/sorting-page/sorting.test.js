/* eslint-disable testing-library/no-render-in-setup */
import { render } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom"
import { ElementStates } from "../../types/element-states"
import { Direction } from "../../types/types"
import { bubbleSort, selectionSort } from "./sorting"
import { SortingPage } from "./sorting-page"

const emptyArray = []
const oneElementArray = [{
  value: 1,
  state: ElementStates.Default
}]

const oneElementArrayOutput = [{
  value: 1,
  state: ElementStates.Modified
}]

const severalElementsArray = [
  {
    value: 2,
    state: ElementStates.Default
  },
  {
    value: 1,
    state: ElementStates.Default
  },
  {
    value: 3,
    state: ElementStates.Default
  },
]

const severalElementsArrayOutputAscending = [
  {
    value: 1,
    state: ElementStates.Modified
  },
  {
    value: 2,
    state: ElementStates.Modified
  },
  {
    value: 3,
    state: ElementStates.Modified
  },
]

const severalElementsArrayOutputDescending = [
  {
    value: 3,
    state: ElementStates.Modified
  },
  {
    value: 2,
    state: ElementStates.Modified
  },
  {
    value: 1,
    state: ElementStates.Modified
  },
]

describe('Тестирование алгоритмов сортировки выбором и пузырьком', () => {
  beforeEach(() => {
    render(
      <Router>
        <SortingPage />
      </Router>
    )
  })

  it('Корректно сортирует пузырьком пустой массив', async () => {
    expect(await bubbleSort(emptyArray, Direction.Ascending)).toEqual(emptyArray)
    expect(await bubbleSort(emptyArray, Direction.Descending)).toEqual(emptyArray)
  })
  
  it('Корректно сортирует пузырьком массив с одним элементом', async () => {
    expect(await bubbleSort(oneElementArray, Direction.Ascending)).toEqual(oneElementArrayOutput)
    expect(await bubbleSort(oneElementArray, Direction.Descending)).toEqual(oneElementArrayOutput)
  })

  it('Корректно сортирует пузырьком массив из нескольких элементов', async () => {
    expect(await bubbleSort(severalElementsArray, Direction.Ascending)).toEqual(severalElementsArrayOutputAscending)
    expect(await bubbleSort(severalElementsArray, Direction.Descending)).toEqual(severalElementsArrayOutputDescending)
  })

  it('Корректно сортирует выбором пустой массив', async () => {
    expect(await selectionSort(emptyArray, Direction.Ascending)).toEqual(emptyArray)
    expect(await selectionSort(emptyArray, Direction.Descending)).toEqual(emptyArray)
  })
  
  it('Корректно сортирует выбором массив с одним элементом', async () => {
    expect(await selectionSort(oneElementArray, Direction.Ascending)).toEqual(oneElementArrayOutput)
    expect(await selectionSort(oneElementArray, Direction.Descending)).toEqual(oneElementArrayOutput)
  })

  it('Корректно сортирует выбором массив из нескольких элементов', async () => {
    expect(await selectionSort(severalElementsArray, Direction.Ascending)).toEqual(severalElementsArrayOutputAscending)
    expect(await selectionSort(severalElementsArray, Direction.Descending)).toEqual(severalElementsArrayOutputDescending)
  })
})