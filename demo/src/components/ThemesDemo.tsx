import { useTranslation } from 'react-i18next'
import { SplitFlap, Presets } from 'react-split-flap'

const ThemesDemo = () => {
  const { t } = useTranslation()

  return (
    <div className="demo-section">
      <h2>{t('sections.themes.title')}</h2>
      <p>{t('sections.themes.description')}</p>
      <div className="theme-grid">
        <div className="theme-item">
          <h3>{t('sections.themes.small')}</h3>
          <div className="demo-display">
            <SplitFlap value="SM" chars={Presets.ALPHANUM} length={2} size="small" theme="dark" />
          </div>
        </div>
        <div className="theme-item">
          <h3>{t('sections.themes.medium')}</h3>
          <div className="demo-display">
            <SplitFlap value="MD" chars={Presets.ALPHANUM} length={2} size="medium" theme="light" />
          </div>
        </div>
        <div className="theme-item">
          <h3>{t('sections.themes.large')}</h3>
          <div className="demo-display">
            <SplitFlap value="LG" chars={Presets.ALPHANUM} length={2} size="large" theme="dark" />
          </div>
        </div>
        <div className="theme-item">
          <h3>{t('sections.themes.xlarge')}</h3>
          <div className="demo-display">
            <SplitFlap value="XL" chars={Presets.ALPHANUM} length={2} size="xlarge" theme="light" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemesDemo
