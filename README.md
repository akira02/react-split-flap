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
