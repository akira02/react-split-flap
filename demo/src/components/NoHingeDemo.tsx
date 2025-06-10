import { SplitFlap, Presets } from 'react-split-flap'

const NoHingeDemo = () => {
  return (
    <div className="demo-section">
      <h2>無鉸鏈模式 - No Hinge Mode</h2>
      <p>關閉中間分隔線，呈現更簡潔的視覺效果</p>
      <div className="demo-display">
        <SplitFlap value="NO HINGE" chars={Presets.ALPHANUM} length={8} size="large" theme="dark" hinge={false} />
      </div>
    </div>
  )
}

export default NoHingeDemo
