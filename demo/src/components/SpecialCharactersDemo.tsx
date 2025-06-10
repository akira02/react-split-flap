import { SplitFlap, Presets } from 'react-split-flap'

const SpecialCharactersDemo = () => {
  return (
    <div className="demo-section">
      <h2>特殊字符 - Special Characters</h2>
      <p>支援數字、字母和常用符號的混合顯示</p>
      <div className="demo-display">
        <SplitFlap value="HELLO!" chars={Presets.ALPHANUM} length={6} size="large" theme="light" timing={30} />
      </div>
    </div>
  )
}

export default SpecialCharactersDemo
