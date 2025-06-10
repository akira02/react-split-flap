// Import CSS styles so they are included in the bundle
import './SplitFlap.css'

export { default as SplitFlap } from './SplitFlap'
export { default } from './SplitFlap'
export { default as LongFlap } from './LongFlap'
export { Presets } from './presets'

// Export types
export type { SplitFlapProps, LongFlapProps } from './types'
export type { PresetKey } from './presets'

// Export all components (internal components for advanced usage)
export * from './components'
