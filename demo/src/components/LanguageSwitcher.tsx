import { useTranslation } from 'react-i18next'
import './LanguageSwitcher.css'

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'zh' : 'en'
    i18n.changeLanguage(newLang)
  }

  return (
    <div className="language-switcher">
      <button onClick={toggleLanguage} className="language-toggle">
        <span className="language-icon">🌐</span>
        <span>{t('language.switch')}</span>
        <span className="language-text">{i18n.language === 'en' ? t('language.chinese') : t('language.english')}</span>
      </button>
    </div>
  )
}

export default LanguageSwitcher
