import React, { Fragment } from 'react'
import { LongFlapProps } from './types'
import { FlapStack } from './components'

const LongFlap: React.FC<LongFlapProps> = ({
  flaps,
  displayId,
  digitWidth,
  digitHeight = 50,
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
  // Memoize the stack to maintain stable references
  const flapStack = React.useMemo(() => flaps.map((f) => <Fragment key={f.id}>{f.component}</Fragment>), [flaps])

  // Memoize the current index to maintain stable reference
  const currentIndex = React.useMemo(() => {
    const flapIndex = flaps.findIndex((f) => f.id === displayId)
    return flapIndex !== -1 ? flapIndex : 0
  }, [flaps, displayId])

  const displayClasses = ['split-flap-display', theme !== 'default' ? theme : '', size, 'long-flap-mode', className]
    .filter(Boolean)
    .join(' ')

  // Add custom styles for LongFlap to ensure proper display
  const longFlapStyle = {
    ...style,
    '--digit-width': digitWidth ? `${digitWidth}px` : 'auto',
    '--digit-height': digitHeight ? `${digitHeight}px` : 'auto',
    ...(background && { '--flap-background': background }),
    ...(fontColor && { '--flap-font-color': fontColor }),
  } as React.CSSProperties & {
    '--digit-width': string
    '--digit-height': string
    '--flap-background'?: string
    '--flap-font-color'?: string
  }

  const content = (
    <div className={displayClasses} style={longFlapStyle} aria-hidden="true">
      <FlapStack
        stack={flapStack}
        value={currentIndex}
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
