import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import './SplitFlap.css'

export interface SplitFlapProps {
  /**
   * The value to display
   */
  value: string
  /**
   * Characters available for display
   */
  chars?: string
  /**
   * Array of words to use instead of single characters
   */
  words?: string[]
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
   * Animation timing in milliseconds
   */
  timing?: number
  /**
   * Show hinge line
   */
  hinge?: boolean
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

// Preset character sets for common use cases
export const Presets = {
  NUM: ' 0123456789',
  ALPHANUM: ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
}

const SplitFlap: React.FC<SplitFlapProps> = ({
  value,
  chars = Presets.NUM,
  words,
  length,
  padChar = ' ',
  padMode = 'auto',
  timing = 30,
  hinge = true,
  className = '',
  style,
  render,
}) => {
  const [displayValue, setDisplayValue] = useState<string>('')
  const [animatingDigits, setAnimatingDigits] = useState<{
    [key: number]: { isAnimating: boolean; targetChar: string; currentChar: string }
  }>({})
  const [maxWordWidth, setMaxWordWidth] = useState<number>(0)
  const measureRef = useRef<HTMLDivElement>(null)
  const timeoutRefs = useRef<{ [key: number]: ReturnType<typeof setTimeout>[] }>({})

  // Measure the width of the widest word in words mode
  useEffect(() => {
    if (words && measureRef.current) {
      let maxWidth = 0
      const tempElement = document.createElement('div')
      tempElement.style.position = 'absolute'
      tempElement.style.visibility = 'hidden'
      tempElement.style.fontFamily = "'Monaco', 'Menlo', 'Ubuntu Mono', monospace"
      tempElement.style.fontWeight = 'bold'
      tempElement.style.fontSize = getComputedStyle(measureRef.current).fontSize
      tempElement.style.whiteSpace = 'nowrap'
      document.body.appendChild(tempElement)

      words.forEach((word) => {
        tempElement.textContent = word
        const width = tempElement.getBoundingClientRect().width
        if (width > maxWidth) {
          maxWidth = width
        }
      })

      document.body.removeChild(tempElement)
      setMaxWordWidth(maxWidth)
    }
  }, [words])

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutRefs.current).forEach((timeouts) => timeouts.forEach((timeout) => clearTimeout(timeout)))
    }
  }, [])

  // Process value changes
  useEffect(() => {
    let processedValue = value

    // Handle padding
    if (processedValue.length < length) {
      const padCount = length - processedValue.length
      const padding = padChar.repeat(padCount)

      if (padMode === 'start' || (padMode === 'auto' && /^\d+$/.test(processedValue))) {
        processedValue = padding + processedValue
      } else {
        processedValue = processedValue + padding
      }
    } else if (processedValue.length > length) {
      processedValue = processedValue.substring(0, length)
    }

    // Convert to uppercase if not using words
    if (!words) {
      processedValue = processedValue.toUpperCase()
    }

    setDisplayValue(processedValue)
  }, [value, length, padChar, padMode, words])

  const getCharArray = () => {
    return words || chars.split('')
  }

  // Generate intermediate animation frames
  const generateAnimationFrames = (fromChar: string, toChar: string): string[] => {
    const charArray = getCharArray()
    const fromIndex = charArray.indexOf(fromChar)
    const toIndex = charArray.indexOf(toChar)

    if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
      return [toChar]
    }

    const frames: string[] = []
    let currentIndex = fromIndex

    // Create animation frames by cycling through characters
    while (currentIndex !== toIndex) {
      currentIndex = (currentIndex + 1) % charArray.length
      frames.push(charArray[currentIndex])
    }

    return frames
  }

  // Trigger animations when display value changes
  const prevDisplayValue = useRef<string>('')
  useLayoutEffect(() => {
    if (prevDisplayValue.current && prevDisplayValue.current !== displayValue) {
      for (let i = 0; i < length; i++) {
        const prevChar = prevDisplayValue.current[i] || padChar
        const newChar = displayValue[i] || padChar

        if (prevChar !== newChar) {
          // Clear any existing timeouts for this digit
          if (timeoutRefs.current[i]) {
            timeoutRefs.current[i].forEach(clearTimeout)
          }
          timeoutRefs.current[i] = []

          // Generate animation frames
          const frames = generateAnimationFrames(prevChar, newChar)

          // Set initial animation state
          setAnimatingDigits((prev) => ({
            ...prev,
            [i]: {
              isAnimating: true,
              targetChar: newChar,
              currentChar: prevChar,
            },
          }))

          // Animate through frames
          frames.forEach((frameChar, frameIndex) => {
            const timeout = setTimeout(() => {
              setAnimatingDigits((prev) => ({
                ...prev,
                [i]: {
                  ...prev[i],
                  currentChar: frameChar,
                  isAnimating: frameIndex < frames.length - 1,
                },
              }))

              // Clean up animation state when done
              if (frameIndex === frames.length - 1) {
                setTimeout(() => {
                  setAnimatingDigits((prev) => {
                    const newState = { ...prev }
                    delete newState[i]
                    return newState
                  })
                }, 300) // Final flip animation duration
              }
            }, frameIndex * timing)

            timeoutRefs.current[i].push(timeout)
          })
        }
      }
    }
    prevDisplayValue.current = displayValue
  }, [displayValue, length, padChar, timing])

  const renderDigit = (char: string, index: number) => {
    const animationState = animatingDigits[index]
    const isAnimating = animationState?.isAnimating || false
    const displayChar = animationState?.currentChar || char
    const digitMode = words ? 'words' : chars === Presets.NUM ? 'num' : 'alpha'

    // For words mode, use fixed width based on the widest word
    const digitStyle = words && maxWordWidth > 0 ? { width: `${maxWordWidth + 16}px` } : {}

    return (
      <div
        key={index}
        className={`split-flap-digit ${isAnimating ? 'animating' : ''}`}
        data-kind="digit"
        data-mode={digitMode}
        style={digitStyle}
      >
        <div className="split-flap-digit-content">
          <div className="split-flap-digit-top">
            <span className="split-flap-digit-char">{displayChar}</span>
          </div>
          <div className="split-flap-digit-bottom">
            <span className="split-flap-digit-char">{displayChar}</span>
          </div>
          {hinge && <div className="split-flap-hinge" data-kind="hinge" />}
        </div>
      </div>
    )
  }

  // For words mode, render as a single unit with unified background
  if (words && length === 1) {
    const char = displayValue[0] || padChar
    const animationState = animatingDigits[0]
    const isAnimating = animationState?.isAnimating || false
    const displayChar = animationState?.currentChar || char

    const content = (
      <div
        ref={measureRef}
        className={`split-flap-display split-flap-words-mode ${className}`}
        style={{
          display: 'inline-block',
          ...style,
        }}
      >
        <div
          className={`split-flap-digit ${isAnimating ? 'animating' : ''}`}
          data-kind="digit"
          data-mode="words"
          style={{ width: maxWordWidth > 0 ? `${maxWordWidth + 16}px` : 'auto', minWidth: '60px' }}
        >
          <div className="split-flap-digit-content">
            <div className="split-flap-digit-top">
              <span className="split-flap-digit-char">{displayChar}</span>
            </div>
            <div className="split-flap-digit-bottom">
              <span className="split-flap-digit-char">{displayChar}</span>
            </div>
            {hinge && <div className="split-flap-hinge" data-kind="hinge" />}
          </div>
        </div>
      </div>
    )

    return render ? render(content) : content
  }

  const digits: React.ReactElement[] = []
  for (let i = 0; i < length; i++) {
    const char = displayValue[i] || padChar
    digits.push(renderDigit(char, i))
  }

  const content = (
    <div
      ref={measureRef}
      className={`split-flap-display ${words ? 'split-flap-words-mode' : ''} ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: words ? '0px' : '2px', // No gap for words mode to create unified background
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {digits}
    </div>
  )

  return render ? render(content) : content
}

export default SplitFlap
