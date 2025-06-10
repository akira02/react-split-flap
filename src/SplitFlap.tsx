import React, { useState, useEffect, useCallback } from 'react'
import { Presets } from './presets'
import './SplitFlap.css'

export interface SplitFlapProps {
  /**
   * The value to display
   */
  value: string
  /**
   * Characters/elements available for display - can include ReactNode components
   */
  chars?: (string | React.ReactNode)[]
  /**
   * Number of digits to display
   */
  length: number
  /**
   * Character used for padding
   */
  padChar?: string
  /**
   * Padding mode: 'auto', 'start', 'end'
   */
  padMode?: 'auto' | 'start' | 'end'
  /**
   * Custom width for each digit (in pixels)
   */
  digitWidth?: number
  /**
   * Animation timing in milliseconds
   */
  timing?: number
  /**
   * Show hinge line
   */
  hinge?: boolean
  /**
   * Theme variant
   */
  theme?: 'default' | 'light' | 'dark'
  /**
   * Size variant
   */
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  /**
   * CSS class name
   */
  className?: string
  /**
   * CSS styles
   */
  style?: React.CSSProperties
  /**
   * Custom render function
   */
  render?: (children: React.ReactNode) => React.ReactNode
}

// Individual flap component
interface FlapProps {
  children: React.ReactNode
  bottom?: boolean
  animated?: boolean
  final?: boolean
  hinge?: boolean
}

const Flap: React.FC<FlapProps> = ({ bottom, animated, final, hinge, children }) => {
  const classes = ['split-flap-part', bottom ? 'bottom' : 'top', animated ? 'animated' : '', final ? 'final' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <span className="split-flap-char">{children}</span>
      {hinge && <div className="split-flap-hinge" data-kind="hinge" />}
    </div>
  )
}

// Single digit component with flip animation
interface FlapDigitProps {
  value: React.ReactNode
  prevValue: React.ReactNode
  final: boolean
  mode: 'num' | 'alpha' | 'custom' | 'words'
  hinge: boolean
  digitWidth?: number
}

const FlapDigit: React.FC<FlapDigitProps> = ({ value, prevValue, final, mode, hinge, digitWidth }) => {
  const digitStyle = digitWidth ? { width: `${digitWidth}px` } : {}

  return (
    <div className="split-flap-digit" data-kind="digit" data-mode={mode} style={digitStyle}>
      {/* Static top half showing current value */}
      <Flap hinge={hinge}>{value}</Flap>

      {/* Static bottom half showing previous value */}
      <Flap bottom hinge={hinge}>
        {prevValue}
      </Flap>

      {/* Animated top half flipping from previous to current */}
      <Flap key={`top-${String(prevValue)}`} animated final={final} hinge={hinge}>
        {prevValue}
      </Flap>

      {/* Animated bottom half appearing after top half flips */}
      {final && (
        <Flap key={`bottom-${String(value)}`} bottom animated final hinge={hinge}>
          {value}
        </Flap>
      )}
    </div>
  )
}

// Stack component controlling the animation sequence
interface FlapStackProps {
  stack: (string | React.ReactNode)[]
  value: string | React.ReactNode
  timing: number
  mode: 'num' | 'alpha' | 'custom' | 'words'
  hinge: boolean
  digitWidth?: number
}

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

// Main display component
const SplitFlap: React.FC<SplitFlapProps> = ({
  value,
  chars = Presets.NUM,
  length,
  padChar = ' ',
  padMode = 'auto',
  digitWidth,
  timing = 60,
  hinge = true,
  theme = 'default',
  size = 'medium',
  className = '',
  style,
  render,
}) => {
  const [displayValue, setDisplayValue] = useState<string>('')
  const [mode, setMode] = useState<'num' | 'alpha' | 'custom'>('num')

  // Determine mode based on chars content
  useEffect(() => {
    // Check if chars contains only numbers
    const isNumeric = chars.every((char) => typeof char === 'string' && /^[\s0-9]$/.test(char))

    // Check if chars contains React components
    const hasComponents = chars.some((char) => typeof char !== 'string')

    if (hasComponents) {
      setMode('custom')
    } else if (isNumeric) {
      setMode('num')
    } else {
      setMode('alpha')
    }
  }, [chars])

  // Process value with padding
  useEffect(() => {
    let processedValue = value

    // Handle padding
    if (processedValue.length < length) {
      const padCount = length - processedValue.length
      const padding = padChar.repeat(padCount)

      const padStart = padMode === 'auto' ? /^[0-9.,+-]*$/.test(processedValue) : padMode === 'start'

      processedValue = padStart ? padding + processedValue : processedValue + padding
    } else if (processedValue.length > length) {
      processedValue = processedValue.substring(0, length)
    }

    // Convert to uppercase for string chars
    if (mode !== 'custom') {
      processedValue = processedValue.toUpperCase()
    }

    setDisplayValue(processedValue)
  }, [value, length, padChar, padMode, mode])

  // Helper function to find matching char in stack
  const findCharInStack = (char: string): string | React.ReactNode => {
    // First try exact match
    const exactMatch = chars.find((item) => {
      if (typeof item === 'string') {
        return item === char
      }
      return String(item) === char
    })

    if (exactMatch !== undefined) {
      return exactMatch
    }

    // If no exact match, return the original char (will be added to stack dynamically)
    return char
  }

  const renderDigits = useCallback(() => {
    const digits: React.ReactElement[] = []

    // When length=1, display the entire value as a single flap
    if (length === 1) {
      // Convert to uppercase for string chars
      const singleValue = mode !== 'custom' ? value.toUpperCase() : value
      const stackValue = findCharInStack(singleValue)

      digits.push(
        <FlapStack
          key={0}
          stack={chars}
          value={stackValue}
          mode="words"
          timing={timing}
          hinge={hinge}
          digitWidth={digitWidth}
        />
      )
    } else {
      // When length>1, display each character separately
      for (let i = 0; i < length; i++) {
        const char = displayValue[i] || padChar
        const stackValue = findCharInStack(char)

        digits.push(
          <FlapStack
            key={i}
            stack={chars}
            value={stackValue}
            mode={mode}
            timing={timing}
            hinge={hinge}
            digitWidth={digitWidth}
          />
        )
      }
    }

    return digits
  }, [displayValue, chars, mode, length, padChar, timing, hinge, digitWidth, value])

  const displayClasses = [
    'split-flap-display',
    theme !== 'default' ? theme : '',
    size, // Always include the size class
    mode === 'custom' ? 'custom-mode' : '',
    length === 1 ? 'words-mode' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <div className={displayClasses} style={style} aria-hidden="true" aria-label={value}>
      {renderDigits()}
    </div>
  )

  return render ? render(content) : content
}

export default SplitFlap
