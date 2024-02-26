import React from 'react';
import { ListContainer, ListTitle, ListIcon, ListIconAnswer } from './style';
import { RootState } from '../../redux/store';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import correctIcon from '../../assets/images/icon-correct.svg';
import wrongIcon from '../../assets/images/icon-error.svg';

interface Props {
  option: string;
  index: number;
  onClick: () => void;
  clasname?: string;
}

const choicesTitle: string[] = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
];

interface Props {
  option: string;
  index: number;
  onClick: () => void;
  onKeyDown?: (e?: React.KeyboardEvent<HTMLLIElement>) => void;
  className?: string;
}

const SelectionElement: React.FC<Props> = ({ option, index, onClick, onKeyDown, className}) => {
  const darkMode = useAppSelector((state: RootState) => state.darkMode);
  return (
    <ListContainer
      $darkMode={darkMode}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
      className={className}
      data-testid={`index-${index}`}
    >
      <ListIcon>{choicesTitle[index]}</ListIcon>
      <ListTitle $darkMode={darkMode}>{option}</ListTitle>
      {(className === 'correctAnswer' || className === 'correct') && (
        <ListIconAnswer src={correctIcon} alt="correct icon" />
      )}
      {className === 'wrongAnswer' && (
        <ListIconAnswer src={wrongIcon} alt="wrong icon" />
      )}

  
    </ListContainer>
  );
};

export default SelectionElement;
