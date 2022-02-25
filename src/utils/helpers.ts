export type IAsyncResponse<T> = Promise<T | Error>;

export function tryCatch<T>(promise: Promise<T>): IAsyncResponse<T> {
  return promise.then((res) => res).catch((err: Error) => err)
}

export const noop = () => {};
