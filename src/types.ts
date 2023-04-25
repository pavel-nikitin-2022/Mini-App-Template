export enum ProcessStatus {
  Start = 'Start',
  Pending = 'Pending',
  Result = 'Result',
}

export type ServerAnswer = {
  animal: string
  probability: number
  coordinates: [number, number, number, number]
} | null
