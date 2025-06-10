import { useState, useEffect } from 'react'
import { LongFlap } from 'react-split-flap'

interface TrainType {
  type: string
  color: string
  textColor: string
  bgColor: string
}

interface Destination {
  japanese: string
  english: string
}

interface TrainDisplayProps {
  platformNumber: string
}

// Move data outside component to avoid recreating on each render
const KEIKYU_TRAIN_TYPES: TrainType[] = [
  { type: '快特', color: '#E60012', textColor: '#FFFFFF', bgColor: '#E60012' }, // Red for Limited Express
  { type: '特急', color: '#FF6600', textColor: '#FFFFFF', bgColor: '#FF6600' }, // Orange for Express
  { type: '急行', color: '#0066CC', textColor: '#FFFFFF', bgColor: '#0066CC' }, // Blue for Express
  { type: '普通', color: '#009639', textColor: '#FFFFFF', bgColor: '#009639' }, // Green for Local
  { type: 'エアポート急行', color: '#00A0E9', textColor: '#FFFFFF', bgColor: '#00A0E9' }, // Sky blue for Airport Express
]

const KEIKYU_DESTINATIONS: Destination[] = [
  { japanese: '羽田空港', english: 'Haneda Airport' },
  { japanese: '品川', english: 'Shinagawa' },
  { japanese: '横浜', english: 'Yokohama' },
  { japanese: '新宿', english: 'Shinjuku' },
  { japanese: '浅草', english: 'Asakusa' },
  { japanese: '西馬込', english: 'Nishi-Magome' },
  { japanese: '三崎口', english: 'Misakiguchi' },
  { japanese: '金沢文庫', english: 'Kanazawa-Bunko' },
  { japanese: '上大岡', english: 'Kamiooka' },
  { japanese: '日本橋', english: 'Nihombashi' },
]

// Pre-generate flaps outside component to ensure stable references
const TRAIN_TYPE_FLAPS = KEIKYU_TRAIN_TYPES.map((train, index) => ({
  id: index.toString(),
  component: (
    <div
      style={{
        background: train.bgColor,
        color: train.textColor,
        padding: '15px 25px',
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center',
        minWidth: '180px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '3px solid rgba(255,255,255,0.3)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
        letterSpacing: '3px',
      }}
    >
      {train.type}
    </div>
  ),
}))

const DESTINATION_FLAPS = KEIKYU_DESTINATIONS.map((dest, index) => ({
  id: index.toString(),
  component: (
    <div
      style={{
        background: '#000000',
        color: '#FFFFFF',
        padding: '20px 30px',
        fontSize: '28px',
        fontWeight: 'bold',
        textAlign: 'center',
        minWidth: '400px',
        height: '70px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #333333',
        letterSpacing: '2px',
      }}
    >
      <div style={{ fontSize: '32px', marginBottom: '4px' }}>{dest.japanese}</div>
      <div style={{ fontSize: '18px', opacity: 0.8, letterSpacing: '1px' }}>{dest.english}</div>
    </div>
  ),
}))

const TrainDemo = () => {
  const [currentTrainType, setCurrentTrainType] = useState(0)
  const [currentDestination, setCurrentDestination] = useState(0)

  // Independent cycling for train types and destinations
  useEffect(() => {
    const trainTypeInterval = setInterval(() => {
      setCurrentTrainType((prev) => (prev + 1) % KEIKYU_TRAIN_TYPES.length)
    }, 4000) // Train type changes every 4 seconds

    const destinationInterval = setInterval(() => {
      setCurrentDestination((prev) => (prev + 1) % KEIKYU_DESTINATIONS.length)
    }, 5500) // Destination changes every 5.5 seconds

    return () => {
      clearInterval(trainTypeInterval)
      clearInterval(destinationInterval)
    }
  }, [])

  const TrainDisplay: React.FC<TrainDisplayProps> = ({ platformNumber }) => (
    <div
      style={{
        background: 'linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        border: '4px solid #444',
        minWidth: '800px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Keikyu logo area */}
      <div
        style={{
          position: 'absolute',
          top: '15px',
          left: '20px',
          background: '#E60012',
          color: '#FFFFFF',
          padding: '8px 16px',
          borderRadius: '4px',
          fontSize: '16px',
          fontWeight: 'bold',
          letterSpacing: '2px',
        }}
      >
        京急
      </div>

      {/* Platform number */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '30px',
          marginTop: '20px',
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            color: '#000000',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '28px',
            fontWeight: 'bold',
            border: '3px solid #ddd',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          {platformNumber}
        </div>
      </div>

      {/* Main display area */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '30px',
          background: 'rgba(255,255,255,0.05)',
          padding: '30px',
          borderRadius: '12px',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Train type section */}
        <div style={{ flex: '0 0 auto' }}>
          <div
            style={{
              color: '#CCCCCC',
              fontSize: '16px',
              marginBottom: '10px',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            種別
          </div>
          <LongFlap
            key="train-type"
            flaps={TRAIN_TYPE_FLAPS}
            displayId={currentTrainType.toString()}
            digitWidth={200}
            size="large"
            theme="dark"
            timing={40}
          />
        </div>

        {/* Separator */}
        <div
          style={{
            width: '3px',
            height: '100px',
            background: 'linear-gradient(to bottom, transparent, #666, transparent)',
          }}
        />

        {/* Destination section */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: '#CCCCCC',
              fontSize: '16px',
              marginBottom: '10px',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            行先
          </div>
          <LongFlap
            key="destination"
            flaps={DESTINATION_FLAPS}
            displayId={currentDestination.toString()}
            digitWidth={420}
            size="large"
            theme="dark"
            timing={45}
          />
        </div>
      </div>

      {/* Status bar */}
      <div
        style={{
          marginTop: '25px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#FFFFFF',
          fontSize: '16px',
          opacity: 0.9,
          background: 'rgba(0,0,0,0.4)',
          padding: '15px 20px',
          borderRadius: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>🚊</span>
          <span>Keikyu Line</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span>⏰ {new Date().toLocaleTimeString('ja-JP')}</span>
          <span>Platform {platformNumber.replace('番線', '')}</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="demo-section">
      <h2>京急電鐵站牌 - Keikyu Railway Sign</h2>
      <p>模擬京急電鐵真實站牌，車種與行先獨立隨機切換</p>

      <div className="demo-display">
        <TrainDisplay platformNumber="15番線" />
      </div>

      {/* Manual control panels */}
      <div style={{ marginTop: '30px', display: 'flex', gap: '30px', justifyContent: 'center' }}>
        {/* Train type controls */}
        <div>
          <h4 style={{ textAlign: 'center', marginBottom: '15px', color: '#666' }}>車種選択</h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {KEIKYU_TRAIN_TYPES.map((train, index) => (
              <button
                key={index}
                onClick={() => setCurrentTrainType(index)}
                style={{
                  background: currentTrainType === index ? train.bgColor : 'rgba(255,255,255,0.1)',
                  color: currentTrainType === index ? train.textColor : '#333',
                  border: `2px solid ${train.bgColor}`,
                  padding: '8px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  minWidth: '80px',
                }}
              >
                {train.type}
              </button>
            ))}
          </div>
        </div>

        {/* Destination controls */}
        <div>
          <h4 style={{ textAlign: 'center', marginBottom: '15px', color: '#666' }}>行先選択</h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '400px' }}>
            {KEIKYU_DESTINATIONS.map((dest, index) => (
              <button
                key={index}
                onClick={() => setCurrentDestination(index)}
                style={{
                  background: currentDestination === index ? '#333' : 'rgba(255,255,255,0.1)',
                  color: currentDestination === index ? '#FFF' : '#333',
                  border: `2px solid #333`,
                  padding: '6px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                }}
              >
                {dest.japanese}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrainDemo
