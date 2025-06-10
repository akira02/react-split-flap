import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SplitFlap, Presets } from 'react-split-flap'

const AirportDemo = () => {
  const { t } = useTranslation()
  const [airportCode, setAirportCode] = useState('TPE')

  // Airport code demo
  useEffect(() => {
    const codes = ['TPE', 'NRT', 'LAX', 'JFK', 'LHR', 'CDG', 'SIN', 'ICN']
    let index = 0

    const interval = setInterval(() => {
      index = (index + 1) % codes.length
      setAirportCode(codes[index])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="demo-section">
      <h2>{t('sections.airport.title')}</h2>
      <p>{t('sections.airport.description')}</p>
      <div className="demo-display">
        <SplitFlap value={airportCode} chars={Presets.ALPHANUM} length={3} size="large" theme="light" timing={30} />
      </div>
    </div>
  )
}

export default AirportDemo
