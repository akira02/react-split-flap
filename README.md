# React Split Flap

一個模擬經典翻頁顯示器效果的 React 組件，靈感來自火車站和機場的顯示牌。

## 特色功能

- 🎯 **逼真的翻頁動畫** - 模擬真實的機械翻頁效果
- 🎨 **多種主題** - 內建淺色和深色主題
- 📏 **多種尺寸** - 從小型到特大型的尺寸選擇
- ⚙️ **高度可自訂** - 支援自訂字符集、動畫速度等
- 🔧 **TypeScript 支援** - 完整的型別定義
- 📱 **響應式設計** - 適配各種螢幕尺寸
- ✨ **零配置** - CSS 樣式自動注入，無需手動導入
- 🏗️ **模組化設計** - 每個組件都有對應的 CSS 文件

## 安裝

```bash
npm install react-split-flap
# 或
yarn add react-split-flap
```

## 基本使用

```tsx
import React from 'react'
import { SplitFlap, Presets } from 'react-split-flap'
import 'react-split-flap/dist/index.css'

function App() {
  return <SplitFlap value="HELLO" chars={Presets.ALPHANUM} length={5} className="medium dark" />
}
```

## API 參考

### SplitFlap Props

| 屬性        | 型別                                 | 預設值        | 說明                 |
| ----------- | ------------------------------------ | ------------- | -------------------- |
| `value`     | `string`                             | -             | 要顯示的值           |
| `length`    | `number`                             | -             | 顯示的位數           |
| `chars`     | `string`                             | `Presets.NUM` | 可用的字符集         |
| `words`     | `string[]`                           | -             | 使用單詞而非單字符   |
| `padChar`   | `string`                             | `' '`         | 填充字符             |
| `padMode`   | `'auto' \| 'start' \| 'end'`         | `'auto'`      | 填充模式             |
| `timing`    | `number`                             | `30`          | 動畫間隔時間（毫秒） |
| `hinge`     | `boolean`                            | `true`        | 是否顯示鉸鏈線       |
| `className` | `string`                             | `''`          | CSS 類名             |
| `style`     | `React.CSSProperties`                | -             | 內聯樣式             |
| `render`    | `(children: ReactNode) => ReactNode` | -             | 自訂渲染函數         |

### 預設字符集

```tsx
import { Presets } from 'react-split-flap'

// 數字字符集（包含空格）
Presets.NUM = ' 0123456789'

// 字母數字字符集
Presets.ALPHANUM = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
```

### 內建主題

- `small` - 小尺寸 (20px)
- `medium` - 中等尺寸 (36px)
- `large` - 大尺寸 (54px)
- `xlarge` - 特大尺寸 (84px)
- `light` - 淺色主題
- `dark` - 深色主題

## 使用範例

### 數字時鐘

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

### 計數器

```tsx
import React, { useState } from 'react'
import { SplitFlap, Presets } from 'react-split-flap'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <SplitFlap value={count.toString()} chars={Presets.NUM} length={3} className="medium light" padMode="start" />
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  )
}
```

### 文字輪播

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

## 開發

### 本地開發

```bash
# 克隆專案
git clone <repository-url>
cd react-split-flap

# 安裝依賴
yarn install

# 建構套件
yarn build

# 啟動 demo
cd demo
yarn install
yarn dev
```

### 建構

```bash
yarn build
```

## 授權

MIT License

## 貢獻

歡迎提交 Issue 和 Pull Request！

---

Built with ❤️ using React & TypeScript
