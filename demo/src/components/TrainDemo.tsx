import { useState, useEffect } from 'react'
import { LongFlap } from 'react-split-flap'
import { useTranslation } from 'react-i18next'

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
      src={`./images/kawasaki/kind/${trainType}.PNG`}
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

// Generate bikou (remarks) flaps
const BIKOU_FLAPS = Array.from({ length: 60 }, (_, index) => ({
  id: index.toString(),
  component: (
    <img
      src={`./images/kawasaki/bikou/${index}.PNG`}
      alt={`Bikou ${index}`}
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
  component:
    index < 45 ? (
      <img
        src={`./images/kawasaki/dest/${index}.PNG`}
        alt={`Destination ${index}`}
        style={{ width: '200px', height: '50px' }}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    ) : (
      <div />
    ),
}))

// Generate hour flaps (0-24)
const HOUR_FLAPS = Array.from({ length: 25 }, (_, index) => ({
  id: index.toString(),
  component: (
    <img
      src={`./images/kawasaki/hour/${index}.PNG`}
      alt={`Hour ${index}`}
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

// Generate minute flaps (0-9 for both tens and units)
const MINUTE_FLAPS = Array.from({ length: 10 }, (_, index) => ({
  id: index.toString(),
  component: (
    <img
      src={`./images/kawasaki/minute/${index}.PNG`}
      alt={`Minute ${index}`}
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

const TrainDemo = () => {
  const { t } = useTranslation()
  const [currentTrainType, setCurrentTrainType] = useState(0)
  const [currentDestination, setCurrentDestination] = useState(1)
  const [currentSeq, setCurrentSeq] = useState(0)
  const [currentBikou, setCurrentBikou] = useState(0)
  const [currentHour, setCurrentHour] = useState(5)
  const [currentMinuteTens, setCurrentMinuteTens] = useState(4)
  const [currentMinuteUnits, setCurrentMinuteUnits] = useState(0)

  useEffect(() => {
    const trainTypeInterval = setInterval(() => {
      setCurrentTrainType(Math.floor(Math.random() * KEIKYU_TRAIN_TYPES.length))
      setCurrentDestination(Math.floor(Math.random() * 45))
      setCurrentSeq(Math.floor(Math.random() * SEQ.length))
      setCurrentBikou(Math.floor(Math.random() * 60))
      setCurrentHour(Math.floor(Math.random() * 24))
      setCurrentMinuteTens(Math.floor(Math.random() * 6)) // 0-5 for tens digit (00-59)
      setCurrentMinuteUnits(Math.floor(Math.random() * 10)) // 0-9 for units digit
    }, 4000)

    return () => {
      clearInterval(trainTypeInterval)
    }
  }, [])

  return (
    <div className="demo-section">
      <h2>{t('sections.train.title')}</h2>

      <div className="demo-display">
        <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <LongFlap
            key="seq"
            flaps={SEQ_FLAPS}
            displayId={currentSeq.toString()}
            digitWidth={100}
            size="large"
            theme="dark"
          />
          <LongFlap
            key="train-type"
            flaps={TRAIN_TYPE_FLAPS}
            displayId={currentTrainType.toString()}
            digitWidth={81}
            size="large"
            theme="dark"
          />
          <LongFlap
            key="destination"
            flaps={DESTINATION_FLAPS}
            displayId={currentDestination.toString()}
            digitWidth={200}
            size="large"
            theme="dark"
          />
          <LongFlap
            key="hour"
            flaps={HOUR_FLAPS}
            displayId={currentHour.toString()}
            digitWidth={80}
            size="large"
            theme="dark"
          />
          <LongFlap
            key="minute-tens"
            flaps={MINUTE_FLAPS}
            displayId={currentMinuteTens.toString()}
            digitWidth={42}
            size="large"
            theme="dark"
          />
          <LongFlap
            key="minute-units"
            flaps={MINUTE_FLAPS}
            displayId={currentMinuteUnits.toString()}
            digitWidth={42}
            size="large"
            theme="dark"
          />
          <LongFlap
            key="bikou"
            flaps={BIKOU_FLAPS}
            displayId={currentBikou.toString()}
            digitWidth={350}
            size="large"
            theme="dark"
          />
        </div>
      </div>
    </div>
  )
}

export default TrainDemo
