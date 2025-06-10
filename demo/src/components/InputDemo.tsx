import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SplitFlap, Presets } from 'react-split-flap'

const InputDemo = () => {
  const { t } = useTranslation()
  const [customInput, setCustomInput] = useState('DEMO')

  return (
    <div className="demo-section">
      <h2>{t('sections.input.title')}</h2>
      <p>{t('sections.input.description')}</p>
      <div className="control-panel">
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value.slice(0, 8))}
          placeholder={t('sections.input.placeholder')}
          maxLength={8}
        />
      </div>
      <div className="demo-display">
        <SplitFlap
          value={customInput}
          chars={Presets.ALPHANUM}
          length={8}
          size="large"
          theme="light"
          padMode="end"
          timing={25}
        />
      </div>
    </div>
  )
}

export default InputDemo
