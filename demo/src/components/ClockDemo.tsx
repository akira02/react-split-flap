import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SplitFlap, Presets } from 'react-split-flap'

const ClockDemo = () => {
  const { t } = useTranslation()
  const [timeValue, setTimeValue] = useState('')

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      setTimeValue(`${hours}${minutes}${seconds}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const renderTimeDisplay = () => {
    const hours = timeValue.slice(0, 2)
    const minutes = timeValue.slice(2, 4)
    const seconds = timeValue.slice(4, 6)

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <SplitFlap value={hours} chars={Presets.NUM} length={2} size="large" theme="dark" />
        <span style={{ fontSize: '48px', color: '#333', fontWeight: 'bold' }}>:</span>
        <SplitFlap value={minutes} chars={Presets.NUM} length={2} size="large" theme="dark" />
        <span style={{ fontSize: '48px', color: '#333', fontWeight: 'bold' }}>:</span>
        <SplitFlap value={seconds} chars={Presets.NUM} length={2} size="large" theme="dark" />
      </div>
    )
  }

  return (
    <div className="demo-section">
      <h2>{t('sections.clock.title')}</h2>
      <p>{t('sections.clock.description')}</p>
      <div className="demo-display">{renderTimeDisplay()}</div>
    </div>
  )
}

export default ClockDemo
