import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SplitFlap, Presets } from 'react-split-flap'

const CarouselDemo = () => {
  const { t } = useTranslation()
  const [textValue, setTextValue] = useState('HELLO')

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

  return (
    <div className="demo-section">
      <h2>{t('sections.carousel.title')}</h2>
      <p>{t('sections.carousel.description')}</p>
      <div className="demo-display">
        <SplitFlap value={textValue} chars={Presets.ALPHANUM} length={6} size="medium" theme="dark" timing={20} />
      </div>
    </div>
  )
}

export default CarouselDemo
