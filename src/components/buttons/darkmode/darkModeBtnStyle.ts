import styled from "styled-components";

export const DarkModeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 128px;
  max-height: 28px;

  .icon {
    display: flex;
    align-items: center;
    transition: all 0.3s ease-in-out;
  }

  img {
    height: 85%;
    margin: 0 auto;
  }

  button {
    width: 48px;
    height: 26px;
    position: relative;
    display: flex;
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 50px;
    border: none;
  }

  #dark_mode_ball {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 3px;
    left: 5px;
    background-color: ${(props) => props.theme.colors.septenary};
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
    transform: translateX(0px);
  }

  #dark_mode_ball.active {
    transform: translateX(18px);
  }
`;
