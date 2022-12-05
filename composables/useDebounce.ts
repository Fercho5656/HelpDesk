export default function useDebounce(cb: Function, delay: number = 500) {
  let timeout: any

  return (...args: any[]) => {
    clearTimeout(timeout as number);
    timeout = setTimeout(() => {
      cb(...args)
    }, delay);
  }
}