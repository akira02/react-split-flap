import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './components/LanguageSwitcher'
import ClockDemo from './components/ClockDemo'
import CounterDemo from './components/CounterDemo'
import CarouselDemo from './components/CarouselDemo'
import AirportDemo from './components/AirportDemo'
import TemperatureDemo from './components/TemperatureDemo'
import StationsDemo from './components/StationsDemo'
import InputDemo from './components/InputDemo'
import ThemesDemo from './components/ThemesDemo'
import TrainDemo from './components/TrainDemo'
import NoHingeDemo from './components/NoHingeDemo'
import SpecialCharactersDemo from './components/SpecialCharactersDemo'
import LongFlapDemo from './components/LongFlapDemo'
import './App.css'

function App() {
  const { t } = useTranslation()

  return (
    <div className="app">
      <LanguageSwitcher />
      <div className="container">
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>

        <ClockDemo />
        <CounterDemo />
        <CarouselDemo />
        <AirportDemo />
        <TemperatureDemo />
        <StationsDemo />
        <InputDemo />
        <ThemesDemo />
        <TrainDemo />
        <NoHingeDemo />
        <SpecialCharactersDemo />
        <LongFlapDemo />

        <footer>
          <p>Built with React & TypeScript | Powered by Vite</p>
          <p>🎨 參考設計靈感來自經典的 Solari 翻頁顯示器</p>
        </footer>
      </div>
    </div>
  )
}

export default App
