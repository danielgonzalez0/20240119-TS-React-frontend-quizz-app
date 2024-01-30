import { useState } from 'react';
import {
  DarkModeContainer,
} from './darkModeBtnStyle';
import moonDarkImg from '../../../assets/images/icon-moon-dark.svg';
import sunDarkImg from '../../../assets/images/icon-sun-dark.svg';
import moonLightImg from '../../../assets/images/icon-moon-light.svg';
import sunLightImg from '../../../assets/images/icon-sun-light.svg';

const DarkModeBtn = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = (): void => {
    setDarkMode(!darkMode);
  };

  return ( 
    <DarkModeContainer>
      <span className="icon">
        <img src={darkMode ? sunDarkImg : sunLightImg} alt="icon sun" />
      </span>
      <button onClick={handleDarkMode}>
        <span id="dark_mode_ball" className={darkMode ? "active" : ""}></span>
      </button>
      <span className="icon">
        <img src={darkMode ? moonDarkImg : moonLightImg} alt="icon moon" />
      </span>
    </DarkModeContainer>
  );
};

export default DarkModeBtn;
