import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SplitFlap } from 'react-split-flap'
import { JapaneseStations } from '../presets'

const StationsDemo = () => {
  const { t } = useTranslation()
  const [stationName, setStationName] = useState('新宿')

  // Japanese station names rotation
  useEffect(() => {
    let index = 0

    const interval = setInterval(() => {
      index = Math.floor(Math.random() * JapaneseStations.length)
      setStationName(JapaneseStations[index])
    }, 3500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="demo-section">
      <h2>{t('sections.stations.title')}</h2>
      <p>{t('sections.stations.description')}</p>
      <div
        className="demo-display"
        style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          border: '3px solid #4a90e2',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            background: 'rgba(255,255,255,0.1)',
            padding: '20px',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div
            style={{
              background: 'rgba(0,0,0,0.8)',
              padding: '10px',
              borderRadius: '6px',
              border: '2px solid #00ff00',
            }}
          >
            <SplitFlap
              value={stationName}
              chars={JapaneseStations}
              length={1}
              digitWidth={300}
              size="large"
              theme="dark"
              timing={40}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default StationsDemo
