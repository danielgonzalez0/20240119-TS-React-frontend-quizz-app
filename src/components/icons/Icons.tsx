import React from 'react';
import { IconContainer, IconTitle } from './style';

interface Props {
  title?: string;
  icon?: string;
  color?: string;
}
const Icons: React.FC<Props> = (props) => {
  if (Object.keys(props).length === 0) {
    return null; // ou retourner un autre composant par défaut
  }
  const { title, icon, color } = props;

  return (
    <IconContainer>
      <div
        className="icon-container"
        data-testid="iconHeader"
        style={{ backgroundColor: `${color}` }}
      >
        <img src={icon} alt={title} data-testid="imgHeader" />
      </div>
      <IconTitle>{title}</IconTitle>
    </IconContainer>
  );
};

export default Icons;
