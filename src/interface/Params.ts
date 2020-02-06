export interface IParams {
  name: string,
  optional?: string,
  numberArray: number[],
  readonly readOnly: number,
  readonlyArray: ReadonlyArray<number>
}