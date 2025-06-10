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
    // Create extended stack if value is not in original stack
    const extendedStack = (() => {
      const index = stack.findIndex((item) => {
        // Handle exact match for strings
        if (typeof item === 'string' && typeof value === 'string') {
          return item === value
        }
        // For React nodes, use reference equality
        if (typeof item === 'object' && item !== null && value !== null) {
          return item === value
        }
        // Handle ReactNode comparison by converting to strings
        return String(item) === String(value)
      })

      // If value is found in stack, use original stack
      if (index !== -1) {
        return { stack, target: index }
      }

      // If value not found, add it to the end and make it the target
      const newStack = [...stack, value]
      return { stack: newStack, target: newStack.length - 1 }
    })()

    const { stack: currentStack, target } = extendedStack

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

  // Use the extended stack for rendering
  const { stack: renderStack } = (() => {
    const index = stack.findIndex((item) => {
      if (typeof item === 'string' && typeof value === 'string') {
        return item === value
      }
      // For React nodes, use reference equality
      if (typeof item === 'object' && item !== null && value !== null) {
        return item === value
      }
      return String(item) === String(value)
    })

    if (index !== -1) {
      return { stack }
    }

    return { stack: [...stack, value] }
  })()

  return (
    <FlapDigit
      value={renderStack[current] || ''}
      prevValue={renderStack[previous] || ''}
      final={current === target}
      mode={mode}
      hinge={hinge}
      digitWidth={digitWidth}
    />
  )
}

export default FlapStack
