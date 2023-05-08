export enum ProcessStatus {
  Start = 'Start',
  Pending = 'Pending',
  Result = 'Result',
}

export type FetchMLAnswerData = {
  animal: string
  probability: number
  coordinates: [number, number, number, number]
} | null

export type FetchMLAnswerResponse = {
  status: true
  data: FetchMLAnswerData
} | {
  status: false
  error: string
}

export type AnimalFormatter = {
  pattern: RegExp
  message: string
}

export type ServerAnswerFormatters = AnimalFormatter[]
