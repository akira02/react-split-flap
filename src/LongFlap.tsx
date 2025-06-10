import React from 'react'
import { LongFlapProps } from './types'
import { FlapStack } from './components'

const LongFlap: React.FC<LongFlapProps> = ({
  flaps,
  displayId,
  digitWidth,
  timing = 60,
  hinge = true,
  theme = 'default',
  size = 'medium',
  className = '',
  style,
  render,
}) => {
  // Memoize the stack to maintain stable references
  const flapStack = React.useMemo(() => flaps.map((f) => f.component), [flaps])

  // Memoize the current value to maintain stable reference
  const currentValue = React.useMemo(() => {
    const currentFlap = flaps.find((f) => f.id === displayId)
    return currentFlap ? currentFlap.component : flaps.length > 0 ? flaps[0].component : ''
  }, [flaps, displayId])

  const displayClasses = [
    'split-flap-display',
    theme !== 'default' ? theme : '',
    size,
    'custom-mode',
    'words-mode',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Add custom styles for LongFlap to ensure proper display
  const longFlapStyle = {
    ...style,
    '--digit-width': digitWidth ? `${digitWidth}px` : 'auto',
  } as React.CSSProperties & { '--digit-width': string }

  const content = (
    <div className={displayClasses} style={longFlapStyle} aria-hidden="true" aria-label={String(displayId)}>
      <FlapStack
        key={displayId} // Force re-mount when displayId changes
        stack={flapStack}
        value={currentValue}
        timing={timing}
        mode="words"
        hinge={hinge}
        digitWidth={digitWidth}
      />
    </div>
  )

  return render ? render(content) : content
}

export default LongFlap
