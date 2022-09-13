import { useState, useEffect } from "react"

function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const timeoutValue = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(timeoutValue)
    }
  }, [value, delay])

  return debounceValue
}

export default useDebounce
