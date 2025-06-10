import { useState, useEffect } from 'react'
import { LongFlap } from '../../../src/SplitFlap'

const LongFlapDemo = () => {
  const [currentId, setCurrentId] = useState<string>('weather-sunny')

  // Sample flaps with ReactNode components
  const weatherFlaps = [
    {
      id: 'weather-sunny',
      component: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>☀️</span>
          <span>Sunny</span>
        </div>
      ),
    },
    {
      id: 'weather-cloudy',
      component: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>☁️</span>
          <span>Cloudy</span>
        </div>
      ),
    },
    {
      id: 'weather-rainy',
      component: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>🌧️</span>
          <span>Rainy</span>
        </div>
      ),
    },
    {
      id: 'weather-snowy',
      component: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>❄️</span>
          <span>Snowy</span>
        </div>
      ),
    },
  ]

  // Auto cycle through weather states
  useEffect(() => {
    const weatherIds = ['weather-sunny', 'weather-cloudy', 'weather-rainy', 'weather-snowy']
    let currentIndex = 0

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % weatherIds.length
      setCurrentId(weatherIds[currentIndex])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="demo-section">
      <h2>🌤️ LongFlap Component - Weather Display</h2>
      <p>
        This new component allows you to use ReactNode components in flaps with ID-based switching, perfect for complex
        content like icons with text.
      </p>

      <div className="demo-content">
        <LongFlap
          flaps={weatherFlaps}
          displayId={currentId}
          digitWidth={300}
          timing={80}
          size="large"
          theme="dark"
          className="weather-flap"
        />
      </div>

      <div className="controls">
        <p>Manual Control:</p>
        <div className="button-group">
          {weatherFlaps.map((flap) => (
            <button
              key={flap.id}
              onClick={() => setCurrentId(flap.id)}
              className={currentId === flap.id ? 'active' : ''}
            >
              {flap.id.replace('weather-', '').charAt(0).toUpperCase() + flap.id.replace('weather-', '').slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="code-example">
        <h3>Usage Example:</h3>
        <pre>
          <code>
            {`import { LongFlap } from 'react-split-flap-effect'

const flaps = [
  {
    id: 'weather-sunny',
    component: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '24px' }}>☀️</span>
        <span>Sunny</span>
      </div>
    ),
  },
  // ... more flaps
]

<LongFlap
  flaps={flaps}
  displayId="weather-sunny"
  digitWidth={150}
  timing={80}
  size="large"
  theme="dark"
/>`}
          </code>
        </pre>
      </div>
    </section>
  )
}

export default LongFlapDemo
