import React from 'react'
import { FlapDigitProps } from '../types'
import Flap from './Flap'

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

export default FlapDigit
