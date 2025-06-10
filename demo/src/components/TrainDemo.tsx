import { useState, useEffect } from 'react'
import { SplitFlap } from 'react-split-flap'

interface TrainType {
  type: string
  destination: string
  color: string
  textColor: string
}

const TrainDemo = () => {
  const [currentTrain, setCurrentTrain] = useState(0)

  // Different train types with their colors (inspired by Japanese railway systems)
  const trainTypes: TrainType[] = [
    { type: '普通', destination: '品川', color: '#4CAF50', textColor: '#FFFFFF' }, // Green for Local
    { type: '急行', destination: '新宿', color: '#2196F3', textColor: '#FFFFFF' }, // Blue for Express
    { type: '特急', destination: '羽田空港', color: '#F44336', textColor: '#FFFFFF' }, // Red for Limited Express
    { type: '快速', destination: '横浜', color: '#FF9800', textColor: '#FFFFFF' }, // Orange for Rapid
    { type: '準急', destination: '川崎', color: '#9C27B0', textColor: '#FFFFFF' }, // Purple for Semi-Express
    { type: '区間急行', destination: '蒲田', color: '#00BCD4', textColor: '#FFFFFF' }, // Cyan for Regional Express
  ]

  // Cycle through different train types
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrain((prev) => (prev + 1) % trainTypes.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [trainTypes.length])

  // Create train type components for SplitFlap
  const trainTypeComponents = trainTypes.map((train, index) => (
    <div
      key={index}
      style={{
        background: train.color,
        color: train.textColor,
        padding: '12px 20px',
        borderRadius: '8px',
        fontSize: '28px',
        fontWeight: 'bold',
        minWidth: '120px',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        border: '2px solid rgba(255,255,255,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60px',
      }}
    >
      {train.type}
    </div>
  ))

  const train = trainTypes[currentTrain]

  return (
    <div className="demo-section">
      <h2>電車車種顯示 - Train Type Display</h2>
      <p>參考日本電車站牌設計，不同車種配有專屬底色</p>

      <div className="demo-display">
        <div
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            border: '3px solid #444',
            minWidth: '600px',
          }}
        >
          {/* Platform number */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              gap: '15px',
            }}
          >
            <div
              style={{
                background: '#FFFFFF',
                color: '#000000',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '24px',
                fontWeight: 'bold',
                border: '2px solid #ccc',
              }}
            >
              6番線
            </div>
          </div>

          {/* Train type and destination */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              background: 'rgba(255,255,255,0.1)',
              padding: '25px',
              borderRadius: '8px',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Train type with colored background using SplitFlap */}
            <div style={{ minWidth: '120px' }}>
              <SplitFlap
                value={currentTrain.toString()}
                chars={trainTypeComponents}
                length={1}
                size="large"
                theme="dark"
                timing={30}
              />
            </div>

            {/* Destination */}
            <div
              style={{
                background: 'rgba(0,0,0,0.8)',
                padding: '10px',
                borderRadius: '6px',
                border: '2px solid #00ff00',
              }}
            >
              <SplitFlap
                value={train.destination}
                chars={[
                  '品川',
                  '新宿',
                  '羽田空港',
                  '横浜',
                  '川崎',
                  '蒲田',
                  '大森',
                  '京急蒲田',
                  '糀谷',
                  '大鳥居',
                  '穴守稲荷',
                  '天空橋',
                  '国際線ターミナル',
                  '新橋',
                  '銀座',
                  '東銀座',
                  '築地市場',
                  '八丁堀',
                  '茅場町',
                  '人形町',
                  '水天宮前',
                  '清澄白河',
                  '森下',
                  '菊川',
                  '住吉',
                  '錦糸町',
                  '押上',
                  '曳舟',
                  '東向島',
                  '鐘ヶ淵',
                  '堀切菖蒲園',
                  'お花茶屋',
                  '青砥',
                  '京成高砂',
                  '柴又',
                  '新柴又',
                  '矢切',
                  '北国分',
                  '秋山',
                  '東松戸',
                  '松飛台',
                  '大町',
                  '新鎌ヶ谷',
                  '西白井',
                  '白井',
                  '小室',
                  '千葉ニュータウン中央',
                ]}
                length={1}
                digitWidth={200}
                size="large"
                theme="dark"
                timing={40}
              />
            </div>
          </div>

          {/* Additional info bar */}
          <div
            style={{
              marginTop: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#FFFFFF',
              fontSize: '16px',
              opacity: 0.8,
            }}
          >
            <span>🚃 Next Train</span>
            <span>Platform 6</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrainDemo
