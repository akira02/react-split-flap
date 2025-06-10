import React, { useState, useEffect } from 'react'
import { FlapStackProps } from '../types'
import FlapDigit from './FlapDigit'

const FlapStack: React.FC<FlapStackProps> = ({ stack, value, timing, mode, hinge, digitWidth }) => {
  const [cursor, setCursor] = useState({
    current: -1,
    previous: -1,
    target: 0,
  })

  // Reset cursor when stack changes
  useEffect(() => {
    setCursor({
      current: -1,
      previous: -1,
      target: 0,
    })
  }, [stack])

  // Animation sequence when value changes
  useEffect(() => {
    // Validate index and set target
    const target = Math.max(0, Math.min(value, stack.length - 1))
    const currentStack = stack

    let { current, previous } = cursor

    const increment = () => {
      previous = current
      current = current >= currentStack.length - 1 ? 0 : current + 1

      setCursor({
        current,
        previous,
        target,
      })
    }

    // Start the animation
    increment()

    // Continue animation if not at target
    if (current !== target) {
      const timer = setInterval(() => {
        setCursor((prevCursor) => {
          const newPrevious = prevCursor.current
          const newCurrent = prevCursor.current >= currentStack.length - 1 ? 0 : prevCursor.current + 1

          if (newCurrent === target) {
            clearInterval(timer)
          }

          return {
            current: newCurrent,
            previous: newPrevious,
            target,
          }
        })
      }, timing)

      return () => clearInterval(timer)
    }
  }, [stack, value, timing])

  const { current, previous, target } = cursor

  return (
    <FlapDigit
      value={stack[current] || ''}
      prevValue={stack[previous] || ''}
      final={current === target}
      mode={mode}
      hinge={hinge}
      digitWidth={digitWidth}
    />
  )
}

export default FlapStack
