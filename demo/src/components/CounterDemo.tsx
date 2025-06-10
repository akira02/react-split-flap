import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SplitFlap, Presets } from 'react-split-flap'

const CounterDemo = () => {
  const { t } = useTranslation()
  const [numberValue, setNumberValue] = useState('000')

  // Auto increment number demo
  useEffect(() => {
    const interval = setInterval(() => {
      setNumberValue((prev) => {
        const num = (parseInt(prev) + 1) % 1000
        return num.toString().padStart(3, '0')
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="demo-section">
      <h2>{t('sections.counter.title')}</h2>
      <p>{t('sections.counter.description')}</p>
      <div className="demo-display">
        <SplitFlap value={numberValue} chars={Presets.NUM} length={3} size="medium" theme="light" timing={25} />
      </div>
    </div>
  )
}

export default CounterDemo
