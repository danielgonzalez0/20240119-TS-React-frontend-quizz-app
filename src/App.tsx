import { useState } from 'react';
import styled from 'styled-components';
import DarkModeBtn from './components/buttons/darkmode/DarkModeBtn';

const Title = styled.h1`
  font-family: ${(props) => props.theme.typography.headingL.fontFamily};
  font-size: ${(props) => props.theme.typography.headingL.fontSize};
  line-height: ${(props) => props.theme.typography.headingL.lineHeight};

  text-align: center;
`;

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Title>Lorem ipsum</Title>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}

        </button>
          <DarkModeBtn/>
      </div>
    </>
  );
}

export default App;
