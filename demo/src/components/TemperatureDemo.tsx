import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SplitFlap, Presets } from 'react-split-flap'

const TemperatureDemo = () => {
  const { t } = useTranslation()
  const [temperature, setTemperature] = useState('25')

  // Temperature simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature((prev) => {
        const temp = parseInt(prev)
        const newTemp = temp + (Math.random() > 0.5 ? 1 : -1)
        return Math.max(15, Math.min(35, newTemp)).toString().padStart(2, '0')
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="demo-section">
      <h2>{t('sections.temperature.title')}</h2>
      <p>{t('sections.temperature.description')}</p>
      <div className="demo-display" style={{ gap: '5px' }}>
        <SplitFlap value={temperature} chars={Presets.NUM} length={2} size="large" theme="dark" timing={35} />
        <span style={{ fontSize: '54px', color: '#333', fontWeight: 'bold' }}>°C</span>
      </div>
    </div>
  )
}

export default TemperatureDemo
