import { useState, useEffect } from 'react'
import { LongFlap } from 'react-split-flap'

interface Destination {
  japanese: string
  english: string
}

const SEQ: {
  word: string
  style: React.CSSProperties
}[] = [
  { word: '1番線', style: {} },
  { word: '2番線', style: {} },
  { word: '3番線', style: {} },
  { word: '4番線', style: {} },
  { word: '5番線', style: {} },
  { word: '6番線', style: {} },
  { word: '7番線', style: {} },
]

// Replace the KEIKYU_TRAIN_TYPES array with image-based train types
const KEIKYU_TRAIN_TYPES = ['air_exp', 'air_ltd', 'air_rapid_ltd', 'com_ltd', 'exp', 'local', 'ltd', 'out', 'rapid_ltd']

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

const SEQ_FLAPS = Array(50)
  .fill(null)
  .map((_, index) => {
    if (index < SEQ.length) {
      const seq = SEQ[index]
      return {
        id: index.toString(),
        component: <div style={{ ...seq.style, fontSize: '32px' }}>{seq.word}</div>,
      }
    }
    return {
      id: index.toString(),
      component: <div style={{ fontSize: '32px' }}></div>,
    }
  })

// Pre-generate flaps outside component to ensure stable references
const TRAIN_TYPE_FLAPS = KEIKYU_TRAIN_TYPES.map((trainType, index) => ({
  id: index.toString(),
  component: (
    <img
      src={`/images/kawasaki/kind/${trainType}.PNG`}
      alt={`Train type ${trainType}`}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        display: 'block',
      }}
      onError={(e) => {
        e.currentTarget.style.display = 'none'
      }}
    />
  ),
}))

const DESTINATION_FLAPS = Array.from({ length: 60 }, (_, index) => ({
  id: index.toString(),
  component: (
    <img
      src={`/images/kawasaki/dest/${index}.PNG`}
      alt={`Destination ${index}`}
      style={{ width: '200px', height: '50px' }}
      onError={(e) => {
        e.currentTarget.style.display = 'none'
      }}
    />
  ),
}))

const TrainDemo = () => {
  const [currentTrainType, setCurrentTrainType] = useState(0)
  const [currentDestination, setCurrentDestination] = useState(0)
  const [currentSeq, setCurrentSeq] = useState(0)

  useEffect(() => {
    const trainTypeInterval = setInterval(() => {
      setCurrentTrainType(Math.floor(Math.random() * KEIKYU_TRAIN_TYPES.length))
      setCurrentDestination(Math.floor(Math.random() * KEIKYU_DESTINATIONS.length))
      setCurrentSeq(Math.floor(Math.random() * SEQ.length))
    }, 4000)

    return () => {
      clearInterval(trainTypeInterval)
    }
  }, [])

  return (
    <div className="demo-section">
      <h2>電車站牌翻頁</h2>
      <p>模擬電車站牌翻頁</p>

      <div className="demo-display">
        <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', alignItems: 'center' }}>
          <LongFlap
            key="seq"
            flaps={SEQ_FLAPS}
            displayId={currentSeq.toString()}
            digitWidth={100}
            size="large"
            theme="dark"
            timing={40}
          />
          <LongFlap
            key="train-type"
            flaps={TRAIN_TYPE_FLAPS}
            displayId={currentTrainType.toString()}
            digitWidth={81}
            size="large"
            theme="dark"
            timing={40}
          />
          <LongFlap
            key="destination"
            flaps={DESTINATION_FLAPS}
            displayId={currentDestination.toString()}
            digitWidth={200}
            size="large"
            theme="dark"
            timing={45}
          />
        </div>
      </div>
    </div>
  )
}

export default TrainDemo
