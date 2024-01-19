import { useState } from 'react'
import styled from 'styled-components';


const Title = styled.h1`
  font-family: ${props => props.theme.typography.headingLRegular.fontFamily};
  font-size: ${props => props.theme.typography.headingL.fontSize};
  line-height: ${props => props.theme.typography.headingL.lineHeight};
  font-weight: normal;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  `

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Title>Lorem ipsum</Title>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
