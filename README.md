# React Split Flap

![Jun-11-2025 16-06-39](https://github.com/user-attachments/assets/684e11b3-b006-454f-91ea-908ab17b1c21)  
![Jun-11-2025 16-08-48](https://github.com/user-attachments/assets/0cd24149-76f3-4d91-8663-32b5646cd79e)

[![NPM](https://img.shields.io/npm/v/react-split-flap.svg)](https://www.npmjs.com/package/react-split-flap)

A React component that simulates the classic split-flap display effect, inspired by train stations and airport displays.

[Live Demo](https://akira02.github.io/react-split-flap)  
[GitHub Repository](https://github.com/akira02/react-split-flap)

## Features

- **Realistic Flip Animation** - Simulates authentic mechanical flipping effects
- **Multiple Themes** - Built-in light and dark themes
- **Various Sizes** - From small to extra-large size options
- **Highly Customizable** - Support for custom character sets, animation speed, etc.
- **TypeScript Support** - Complete type definitions
- **LongFlap Component** - Support for complex ReactNode content with ID-based switching

## Installation

```bash
npm install react-split-flap
# or
yarn add react-split-flap
```

## Quick Start

```tsx
import React from 'react'
import { SplitFlap, Presets } from 'react-split-flap'

function App() {
  return <SplitFlap value="HELLO" chars={Presets.ALPHANUM} length={5} />
}
```

## Components

### SplitFlap - Character Display

Perfect for displaying strings with character-by-character flipping animation.

#### Props

| Property     | Type                                         | Default       | Description                                                                   |
| ------------ | -------------------------------------------- | ------------- | ----------------------------------------------------------------------------- |
| `value`      | `string`                                     | -             | Value to display                                                              |
| `length`     | `number`                                     | -             | Number of digits to display. If set to 1, will display full value on one flap |
| `chars`      | `string[]`                                   | `Presets.NUM` | Available character set                                                       |
| `padChar`    | `string`                                     | `' '`         | Padding character                                                             |
| `padMode`    | `'auto' \| 'start' \| 'end'`                 | `'auto'`      | 'auto' will align number right and string left                                |
| `digitWidth` | `number`                                     | -             | Custom width for each digit (pixels)                                          |
| `timing`     | `number`                                     | `30`          | Animation interval (milliseconds)                                             |
| `hinge`      | `boolean`                                    | `true`        | Whether to show hinge line                                                    |
| `theme`      | `'default' \| 'light' \| 'dark'`             | `'default'`   | Theme variant                                                                 |
| `size`       | `'small' \| 'medium' \| 'large' \| 'xlarge'` | `'medium'`    | Size variant                                                                  |
| `className`  | `string`                                     | `''`          | CSS class name                                                                |
| `style`      | `React.CSSProperties`                        | -             | Inline styles                                                                 |
| `background` | `string`                                     | -             | Custom background color or gradient for the flaps                             |
| `fontColor`  | `string`                                     | -             | Custom font color for the flap text                                           |
| `render`     | `(children: ReactNode) => ReactNode`         | -             | Custom render function                                                        |

### LongFlap - Complex Content Display

Perfect for displaying complex ReactNode components with ID-based switching, ideal for icons, styled content, and rich components.

#### Props

| Property      | Type                                                  | Default     | Description                                       |
| ------------- | ----------------------------------------------------- | ----------- | ------------------------------------------------- |
| `flaps`       | `Array<{id: string \| number, component: ReactNode}>` | -           | Array of flap items with ID and component         |
| `displayId`   | `string \| number`                                    | -           | Current display ID to show                        |
| `digitWidth`  | `number`                                              | -           | Custom width for the flap (pixels)                |
| `digitHeight` | `number`                                              | -           | Custom height for the flap (pixels)               |
| `timing`      | `number`                                              | `60`        | Animation timing (milliseconds)                   |
| `hinge`       | `boolean`                                             | `true`      | Whether to show hinge line                        |
| `theme`       | `'default' \| 'light' \| 'dark'`                      | `'default'` | Theme variant                                     |
| `size`        | `'small' \| 'medium' \| 'large' \| 'xlarge'`          | `'medium'`  | Size variant                                      |
| `className`   | `string`                                              | `''`        | CSS class name                                    |
| `style`       | `React.CSSProperties`                                 | -           | Inline styles                                     |
| `background`  | `string`                                              | -           | Custom background color or gradient for the flaps |
| `fontColor`   | `string`                                              | -           | Custom font color for the flap text               |
| `render`      | `(children: ReactNode) => ReactNode`                  | -           | Custom render function                            |

#### When to use LongFlap vs SplitFlap

- **Use SplitFlap** when displaying strings or simple text with character-by-character flipping
- **Use LongFlap** when you need:
  - Complex ReactNode components (icons + text, styled content, etc.)
  - ID-based switching between predefined states
  - Single flap displaying rich content
  - Custom rendering of complex elements

## Built-in Themes & Sizes

### Sizes

- `small` - 20px
- `medium` - 36px (default)
- `large` - 54px
- `xlarge` - 84px

### Themes

- `default` - Default styling
- `light` - Light theme
- `dark` - Dark theme

## Usage Examples

### SplitFlap Examples

#### Basic Counter

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

#### Text Display

```tsx
import React, { useState, useEffect } from 'react'
import { SplitFlap, Presets } from 'react-split-flap'

function TextCarousel() {
  const words = ['HELLO', 'WORLD', 'REACT']
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

#### Custom Styling

```tsx
import React from 'react'
import { SplitFlap, Presets } from 'react-split-flap'

function CustomStyledFlap() {
  return (
    <SplitFlap
      value="CUSTOM"
      chars={Presets.ALPHANUM}
      length={6}
      size="large"
      background="linear-gradient(45deg, #ff6b6b, #4ecdc4)"
      fontColor="#ffffff"
      timing={50}
    />
  )
}
```

### LongFlap Examples

#### Weather Display

```tsx
import React, { useState } from 'react'
import { LongFlap } from 'react-split-flap'

/* Keep prop "flaps" constant. Will trigger <LongFlap /> re-render when changed. */
const weatherFlaps = [
  {
    id: 'sunny',
    component: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>☀️</span>
        <span>Sunny</span>
      </div>
    ),
  },
  {
    id: 'rainy',
    component: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>🌧️</span>
        <span>Rainy</span>
      </div>
    ),
  },
]

function WeatherDisplay() {
  const [currentWeather, setCurrentWeather] = useState('sunny')

  return <LongFlap flaps={weatherFlaps} displayId={currentWeather} digitWidth={200} size="large" theme="dark" />
}
```

#### Custom Styled LongFlap

```tsx
import React from 'react'
import { LongFlap } from 'react-split-flap'

const styledFlaps = [
  {
    id: 'status1',
    component: <div style={{ fontSize: '24px', fontWeight: 'bold' }}>🚀 READY</div>,
  },
  {
    id: 'status2',
    component: <div style={{ fontSize: '24px', fontWeight: 'bold' }}>⚡ ACTIVE</div>,
  },
]

function CustomStyledLongFlap() {
  const [status, setStatus] = useState('status1')

  return (
    <LongFlap
      flaps={styledFlaps}
      displayId={status}
      digitWidth={250}
      digitHeight={80}
      background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      fontColor="#ffffff"
      timing={100}
      size="xlarge"
    />
  )
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
yarn global add yalc
yarn dev:publish #use yalc to public local

# Start demo
cd demo
yarn install
yarn dev:hot #force vite use fresh package
```

### Build

```bash
yarn build
```

## License

MIT License

## Contributing

Issues and Pull Requests are welcome!
