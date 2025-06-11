import React, { useState, useEffect, useCallback } from 'react'
import { SplitFlapProps } from './types'
import { FlapStack } from './components'
import { Presets } from './presets'

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
  background,
  fontColor,
  render,
}) => {
  const [displayValue, setDisplayValue] = useState<string>('')
  const [mode, setMode] = useState<'num' | 'alpha' | 'custom'>('num')

  // Determine mode based on chars content
  useEffect(() => {
    // Check if chars contains only numbers
    const isNumeric = chars.every((char) => /^[\s0-9]$/.test(char))

    if (isNumeric) {
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

      const padEnd = padMode === 'auto' ? /^[0-9.,+-]*$/.test(processedValue) : padMode === 'end'

      processedValue = padEnd ? padding + processedValue : processedValue + padding
    } else if (processedValue.length > length) {
      processedValue = processedValue.substring(0, length)
    }

    // Convert to uppercase for string chars
    processedValue = processedValue.toUpperCase()

    setDisplayValue(processedValue)
  }, [value, length, padChar, padMode, mode])

  // Helper function to find index of char in stack
  const findCharIndexInStack = (char: string): { index: number; stack: (string | React.ReactNode)[] } => {
    // First try exact match
    const index = chars.findIndex((item) => item === char)

    if (index !== -1) {
      return { index, stack: chars }
    }

    // If no exact match, create extended stack with the missing character
    // This will cause a full rotation through all chars before showing the fallback
    const extendedStack = [...chars, char]
    return { index: extendedStack.length - 1, stack: extendedStack }
  }

  const renderDigits = useCallback(() => {
    const digits: React.ReactElement[] = []

    // When length=1, display the entire value as a single flap
    if (length === 1) {
      // Use displayValue which already includes padding and case conversion
      const { index: stackIndex, stack } = findCharIndexInStack(displayValue)

      digits.push(
        <FlapStack
          key={0}
          stack={stack}
          value={stackIndex}
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
        const { index: stackIndex, stack } = findCharIndexInStack(char)

        digits.push(
          <FlapStack
            key={i}
            stack={stack}
            value={stackIndex}
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
    length === 1 ? 'words-mode' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Combine styles with custom background and font color
  const combinedStyle = {
    ...style,
    ...(background && { '--flap-background': background }),
    ...(fontColor && { '--flap-font-color': fontColor }),
  } as React.CSSProperties & { '--flap-background'?: string; '--flap-font-color'?: string }

  const content = (
    <div className={displayClasses} style={combinedStyle} aria-hidden="true" aria-label={value}>
      {renderDigits()}
    </div>
  )

  return render ? render(content) : content
}

export default SplitFlap
