export interface ServerError {
	detail: [
    {
      type: string
      loc: string[],
      msg: string,
    }
  ]
}