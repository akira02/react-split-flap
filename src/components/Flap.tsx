import React from 'react'
import { FlapProps } from '../types'

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

export default Flap
