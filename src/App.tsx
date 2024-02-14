import styled from "styled-components";
import DarkModeBtn from "./components/buttons/darkmode/DarkModeBtn";
import { GlobalStyle } from "./styles/globalSettings";
import { useAppSelector } from "./hooks/reduxTypedHooks";
import DisplayData from "./components/displayData/DisplayData";

const Title = styled.h1`
  font-family: ${(props) => props.theme.typography.headingL.fontFamily};
  font-size: ${(props) => props.theme.typography.headingL.fontSize};
  line-height: ${(props) => props.theme.typography.headingL.lineHeight};

  text-align: center;
`;

const App: React.FC = () => {
  const darkMode = useAppSelector((state) => state.darkMode);

  return (
    <>
      <GlobalStyle darkMode={darkMode} />
      <Title>Lorem ipsum lessons</Title>
      <DarkModeBtn />
      <DisplayData />
    </>
  );
};

export default App;
