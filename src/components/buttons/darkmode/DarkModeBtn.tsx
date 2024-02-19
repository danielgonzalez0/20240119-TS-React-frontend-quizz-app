import { DarkModeContainer } from "./darkModeBtnStyle";
import moonDarkImg from "../../../assets/images/icon-moon-dark.svg";
import sunDarkImg from "../../../assets/images/icon-sun-dark.svg";
import moonLightImg from "../../../assets/images/icon-moon-light.svg";
import sunLightImg from "../../../assets/images/icon-sun-light.svg";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxTypedHooks";
import { toggleDarkMode } from "../../../redux/darkMode.slice";

const DarkModeBtn: React.FC = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.darkMode);

  const handleDarkMode = (): void => {
    dispatch(toggleDarkMode());
  };

  return (
    <DarkModeContainer id="darkModeBtn">
      <span className="icon">
        <img src={darkMode ? sunLightImg : sunDarkImg} alt="icon sun" />
      </span>
      <button onClick={handleDarkMode}>
        <span id="dark_mode_ball" className={darkMode ? "active" : ""}></span>
      </button>
      <span className="icon">
        <img src={darkMode ? moonLightImg : moonDarkImg} alt="icon moon" />
      </span>
    </DarkModeContainer>
  );
};

export default DarkModeBtn;
