import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SplitFlap, Presets } from 'react-split-flap'

const InputDemo = () => {
  const { t } = useTranslation()
  const [customInput, setCustomInput] = useState('DEMO')
  const [padMode, setPadMode] = useState<'start' | 'end' | 'auto'>('end')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [size, setSize] = useState<'small' | 'medium' | 'large' | 'xlarge'>('large')
  const [length, setLength] = useState(8)

  return (
    <div className="demo-section">
      <h2>{t('sections.input.title')}</h2>
      <p>{t('sections.input.description')}</p>
      <div className="control-panel">
        <div className="input-group">
          <label>
            <span className="label-text">Text Input</span>
            <span className="label-description">Enter up to {length} characters</span>
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value.slice(0, length))}
              placeholder={t('sections.input.placeholder')}
              maxLength={length}
            />
          </label>
        </div>

        <div className="controls-grid">
          <div className="control-group">
            <label>
              <span className="label-text">Length</span>
              <span className="label-description">Number of characters to display</span>
              <select value={length} onChange={(e) => setLength(Number(e.target.value))}>
                <option value={4}>4</option>
                <option value={6}>6</option>
                <option value={8}>8</option>
                <option value={10}>10</option>
                <option value={12}>12</option>
              </select>
            </label>
          </div>

          <div className="control-group">
            <label>
              <span className="label-text">Pad Mode</span>
              <span className="label-description">How to align text</span>
              <select value={padMode} onChange={(e) => setPadMode(e.target.value as 'start' | 'end' | 'auto')}>
                <option value="start">Start (left align)</option>
                <option value="end">End (right align)</option>
                <option value="auto">Auto (number right, string left)</option>
              </select>
            </label>
          </div>

          <div className="control-group">
            <label>
              <span className="label-text">Theme</span>
              <span className="label-description">Visual appearance style</span>
              <select value={theme} onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
          </div>

          <div className="control-group">
            <label>
              <span className="label-text">Size</span>
              <span className="label-description">Display size of the flip panels</span>
              <select value={size} onChange={(e) => setSize(e.target.value as 'small' | 'medium' | 'large' | 'xlarge')}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="xlarge">XLarge</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      <div className="demo-display">
        <SplitFlap
          value={customInput}
          chars={Presets.ALPHANUM}
          length={length}
          size={size}
          theme={theme}
          padMode={padMode}
          timing={25}
        />
      </div>
    </div>
  )
}

export default InputDemo
