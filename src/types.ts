import React from 'react'

export interface SplitFlapProps {
  /**
   * The value to display
   */
  value: string
  /**
   * Characters available for display - string characters only
   */
  chars?: string[]
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

export interface LongFlapProps {
  /**
   * Array of flap items with id and component
   */
  flaps: Array<{
    id: string | number
    component: React.ReactNode
  }>
  /**
   * Current display ID to show
   */
  displayId: string | number
  /**
   * Custom width for the flap (in pixels)
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

export interface FlapProps {
  children: React.ReactNode
  bottom?: boolean
  animated?: boolean
  final?: boolean
  hinge?: boolean
}

export interface FlapDigitProps {
  value: React.ReactNode
  prevValue: React.ReactNode
  final: boolean
  mode: 'num' | 'alpha' | 'custom' | 'words'
  hinge: boolean
  digitWidth?: number
}

export interface FlapStackProps {
  stack: (string | React.ReactNode)[]
  value: string | React.ReactNode
  timing: number
  mode: 'num' | 'alpha' | 'custom' | 'words'
  hinge: boolean
  digitWidth?: number
}

export interface SplitFlapStackProps {
  stack: string[]
  value: string
  timing: number
  mode: 'num' | 'alpha' | 'custom' | 'words'
  hinge: boolean
  digitWidth?: number
}
