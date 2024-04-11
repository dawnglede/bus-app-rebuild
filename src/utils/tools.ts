export const debounce = (fn: Function, delay: number = 5000) => {
  let timer: NodeJS.Timeout
  return function (...args: any) {
    //@ts-ignore
    let context = this
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(context, args)
    }, delay)
  }
}
