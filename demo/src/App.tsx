import { useState, useEffect } from 'react'
import { SplitFlap, Presets } from 'react-split-flap'
import { JapaneseStations } from './presets'
import 'react-split-flap/dist/index.css'
import './App.css'

function App() {
  const [timeValue, setTimeValue] = useState('')
  const [numberValue, setNumberValue] = useState('000')
  const [textValue, setTextValue] = useState('HELLO')
  const [customInput, setCustomInput] = useState('DEMO')
  const [airportCode, setAirportCode] = useState('TPE')
  const [temperature, setTemperature] = useState('25')
  const [stationName, setStationName] = useState('新宿')

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

  // Cycle through words demo
  useEffect(() => {
    const words = ['HELLO', 'WORLD', 'REACT', 'SPLIT', 'FLAP', 'TOKYO', 'PARIS', 'LONDON']
    let index = 0

    const interval = setInterval(() => {
      index = (index + 1) % words.length
      setTextValue(words[index])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

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

  // Japanese station names rotation
  useEffect(() => {
    let index = 0

    const interval = setInterval(() => {
      index = Math.floor(Math.random() * JapaneseStations.length)
      setStationName(JapaneseStations[index])
    }, 3500)

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
    <div className="app">
      <div className="container">
        <h1>React Split Flap Display</h1>
        <p>經典的翻頁顯示器效果，靈感來自火車站和機場的顯示牌</p>

        <div className="demo-section">
          <h2>即時時鐘 - Real-time Clock</h2>
          <p>每秒更新的數位時鐘，展示連續數字變化效果</p>
          <div className="demo-display">{renderTimeDisplay()}</div>
        </div>

        <div className="demo-section">
          <h2>數字計數器 - Number Counter</h2>
          <p>自動遞增的計數器，展示數字滾動效果</p>
          <div className="demo-display">
            <SplitFlap value={numberValue} chars={Presets.NUM} length={3} size="medium" theme="light" timing={25} />
          </div>
        </div>

        <div className="demo-section">
          <h2>文字輪播 - Text Carousel</h2>
          <p>輪播不同的城市名稱，展示字母變化效果</p>
          <div className="demo-display">
            <SplitFlap value={textValue} chars={Presets.ALPHANUM} length={6} size="medium" theme="dark" timing={20} />
          </div>
        </div>

        <div className="demo-section">
          <h2>機場代碼 - Airport Codes</h2>
          <p>模擬機場顯示牌的三字母代碼變化</p>
          <div className="demo-display">
            <SplitFlap value={airportCode} chars={Presets.ALPHANUM} length={3} size="large" theme="light" timing={30} />
          </div>
        </div>

        <div className="demo-section">
          <h2>溫度顯示 - Temperature Display</h2>
          <p>模擬溫度計的數值變化，帶有度數符號</p>
          <div className="demo-display" style={{ gap: '5px' }}>
            <SplitFlap value={temperature} chars={Presets.NUM} length={2} size="large" theme="dark" timing={35} />
            <span style={{ fontSize: '54px', color: '#333', fontWeight: 'bold' }}>°C</span>
          </div>
        </div>

        <div className="demo-section">
          <h2>🚃 日本車站站名輪播 - Japanese Train Stations</h2>
          <p>模擬日本JR山手線車站的站名顯示牌，自動輪播東京都內主要車站</p>
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

        <div className="demo-section">
          <h2>互動輸入 - Interactive Input</h2>
          <p>自由輸入文字，即時顯示翻頁效果</p>
          <div className="control-panel">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value.slice(0, 8))}
              placeholder="輸入文字..."
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

        <div className="demo-section">
          <h2>主題展示 - Theme Showcase</h2>
          <p>不同大小和主題的顯示效果</p>
          <div className="theme-grid">
            <div className="theme-item">
              <h3>🔸 小型深色 - Small Dark</h3>
              <div className="demo-display">
                <SplitFlap value="SM" chars={Presets.ALPHANUM} length={2} size="small" theme="dark" />
              </div>
            </div>
            <div className="theme-item">
              <h3>⚪ 中型淺色 - Medium Light</h3>
              <div className="demo-display">
                <SplitFlap value="MD" chars={Presets.ALPHANUM} length={2} size="medium" theme="light" />
              </div>
            </div>
            <div className="theme-item">
              <h3>🔷 大型深色 - Large Dark</h3>
              <div className="demo-display">
                <SplitFlap value="LG" chars={Presets.ALPHANUM} length={2} size="large" theme="dark" />
              </div>
            </div>
            <div className="theme-item">
              <h3>⭐ 特大淺色 - XLarge Light</h3>
              <div className="demo-display">
                <SplitFlap value="XL" chars={Presets.ALPHANUM} length={2} size="xlarge" theme="light" />
              </div>
            </div>
          </div>
        </div>

        <div className="demo-section">
          <h2>無鉸鏈模式 - No Hinge Mode</h2>
          <p>關閉中間分隔線，呈現更簡潔的視覺效果</p>
          <div className="demo-display">
            <SplitFlap value="NO HINGE" chars={Presets.ALPHANUM} length={8} size="large" theme="dark" hinge={false} />
          </div>
        </div>

        <div className="demo-section">
          <h2>特殊字符 - Special Characters</h2>
          <p>支援數字、字母和常用符號的混合顯示</p>
          <div className="demo-display">
            <SplitFlap value="HELLO!" chars={Presets.ALPHANUM} length={6} size="large" theme="light" timing={30} />
          </div>
        </div>

        <footer>
          <p>Built with React & TypeScript | Powered by Vite</p>
          <p>🎨 參考設計靈感來自經典的 Solari 翻頁顯示器</p>
        </footer>
      </div>
    </div>
  )
}

export default App
