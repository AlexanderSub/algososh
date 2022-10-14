export interface Step {
  currentArray: number[]
  sortedIndexes: number[]
  aIndex?: number
  bIndex?: number
}

export enum SortType {
  Select = 'select',
  Bubble = 'bubble'
}


