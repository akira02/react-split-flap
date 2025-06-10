# React Split Flap

[![NPM](https://img.shields.io/npm/v/react-split-flap.svg)](https://www.npmjs.com/package/react-split-flap)

A React component that simulates the classic split-flap display effect, inspired by train stations and airport displays.

[Demo](https://akira02.github.io/react-split-flap)

## Features

- 🎯 **Realistic Flip Animation** - Simulates authentic mechanical flipping effects
- 🎨 **Multiple Themes** - Built-in light and dark themes
- 📏 **Various Sizes** - From small to extra-large size options
- ⚙️ **Highly Customizable** - Support for custom character sets, animation speed, etc.
- 🔧 **TypeScript Support** - Complete type definitions

## Installation

```bash
npm install react-split-flap
# or
yarn add react-split-flap
```

## Basic Usage

```tsx
import React from 'react'
import { SplitFlap, Presets } from 'react-split-flap'
import 'react-split-flap/dist/index.css'

function App() {
  return <SplitFlap value="HELLO" chars={Presets.ALPHANUM} length={5} className="medium dark" />
}
```

## API Reference

### SplitFlap Props

| Property    | Type                                 | Default       | Description                            |
| ----------- | ------------------------------------ | ------------- | -------------------------------------- |
| `value`     | `string`                             | -             | Value to display                       |
| `length`    | `number`                             | -             | Number of digits to display            |
| `chars`     | `string`                             | `Presets.NUM` | Available character set                |
| `words`     | `string[]`                           | -             | Use words instead of single characters |
| `padChar`   | `string`                             | `' '`         | Padding character                      |
| `padMode`   | `'auto' \| 'start' \| 'end'`         | `'auto'`      | Padding mode                           |
| `timing`    | `number`                             | `30`          | Animation interval (milliseconds)      |
| `hinge`     | `boolean`                            | `true`        | Whether to show hinge line             |
| `className` | `string`                             | `''`          | CSS class name                         |
| `style`     | `React.CSSProperties`                | -             | Inline styles                          |
| `render`    | `(children: ReactNode) => ReactNode` | -             | Custom render function                 |

### Preset Character Sets

```tsx
import { Presets } from 'react-split-flap'

// Numeric character set (includes space)
Presets.NUM = ' 0123456789'

// Alphanumeric character set
Presets.ALPHANUM = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
```

### Built-in Themes

- `small` - Small size (20px)
- `medium` - Medium size (36px)
- `large` - Large size (54px)
- `xlarge` - Extra large size (84px)
- `light` - Light theme
- `dark` - Dark theme

## Usage Examples

### Digital Clock

```tsx
import React, { useState, useEffect } from 'react'
import { SplitFlap, Presets } from 'react-split-flap'

function DigitalClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toTimeString().slice(0, 8).replace(/:/g, '')
      setTime(timeString)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <SplitFlap
      value={time}
      chars={Presets.NUM}
      length={6}
      className="large dark"
      render={(children) => {
        const digits = React.Children.toArray(children)
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '2px' }}>{digits.slice(0, 2)}</div>
            <span>:</span>
            <div style={{ display: 'flex', gap: '2px' }}>{digits.slice(2, 4)}</div>
            <span>:</span>
            <div style={{ display: 'flex', gap: '2px' }}>{digits.slice(4, 6)}</div>
          </div>
        )
      }}
    />
  )
}
```

### Counter

```tsx
import React, { useState } from 'react'
import { SplitFlap, Presets } from 'react-split-flap'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <SplitFlap value={count.toString()} chars={Presets.NUM} length={3} className="medium light" padMode="start" />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

### Text Carousel

```tsx
import React, { useState, useEffect } from 'react'
import { SplitFlap, Presets } from 'react-split-flap'

function TextCarousel() {
  const words = ['HELLO', 'WORLD', 'REACT', 'SPLIT', 'FLAP']
  const [currentWord, setCurrentWord] = useState(words[0])

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % words.length
      setCurrentWord(words[index])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return <SplitFlap value={currentWord} chars={Presets.ALPHANUM} length={5} className="large dark" timing={20} />
}
```

## LongFlap Component

The `LongFlap` component is designed for scenarios where you need to display complex ReactNode components in a flap display, with ID-based switching. This is perfect for content that includes icons, styled text, or any other React components.

### LongFlap Props

| Property     | Type                                                  | Default     | Description                               |
| ------------ | ----------------------------------------------------- | ----------- | ----------------------------------------- |
| `flaps`      | `Array<{id: string \| number, component: ReactNode}>` | -           | Array of flap items with ID and component |
| `displayId`  | `string \| number`                                    | -           | Current display ID to show                |
| `digitWidth` | `number`                                              | -           | Custom width for the flap (in pixels)     |
| `timing`     | `number`                                              | `60`        | Animation timing (milliseconds)           |
| `hinge`      | `boolean`                                             | `true`      | Whether to show hinge line                |
| `theme`      | `'default' \| 'light' \| 'dark'`                      | `'default'` | Theme variant                             |
| `size`       | `'small' \| 'medium' \| 'large' \| 'xlarge'`          | `'medium'`  | Size variant                              |
| `className`  | `string`                                              | `''`        | CSS class name                            |
| `style`      | `React.CSSProperties`                                 | -           | Inline styles                             |
| `render`     | `(children: ReactNode) => ReactNode`                  | -           | Custom render function                    |

### LongFlap Usage Example

```tsx
import React, { useState, useEffect } from 'react'
import { LongFlap } from 'react-split-flap'

function WeatherDisplay() {
  const [currentWeather, setCurrentWeather] = useState('sunny')

  const weatherFlaps = [
    {
      id: 'sunny',
      component: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>☀️</span>
          <span>Sunny</span>
        </div>
      ),
    },
    {
      id: 'cloudy',
      component: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>☁️</span>
          <span>Cloudy</span>
        </div>
      ),
    },
    {
      id: 'rainy',
      component: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>🌧️</span>
          <span>Rainy</span>
        </div>
      ),
    },
  ]

  // Auto cycle through weather states
  useEffect(() => {
    const weatherIds = ['sunny', 'cloudy', 'rainy']
    let currentIndex = 0

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % weatherIds.length
      setCurrentWeather(weatherIds[currentIndex])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <LongFlap flaps={weatherFlaps} displayId={currentWeather} digitWidth={150} timing={80} size="large" theme="dark" />
  )
}
```

### When to use LongFlap vs SplitFlap

- **Use SplitFlap** when displaying strings or simple text with character-by-character flipping
- **Use LongFlap** when you need:
  - Complex ReactNode components (icons + text, styled content, etc.)
  - ID-based switching between predefined states
  - Single flap displaying rich content
  - Custom rendering of complex elements

## Development

### Local Development

```bash
# Clone the project
git clone <repository-url>
cd react-split-flap

# Install dependencies
yarn install

# Build the package
yarn build

# Start demo
cd demo
yarn install
yarn dev
```

### Build

```bash
yarn build
```

## License

MIT License

## Contributing

Issues and Pull Requests are welcome!
