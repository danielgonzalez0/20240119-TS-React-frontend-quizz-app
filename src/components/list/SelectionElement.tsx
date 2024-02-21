import React from 'react';
import { ListContainer, ListTitle, ListIcon } from './style';
import { RootState } from '../../redux/store';
import { useAppSelector } from '../../hooks/reduxTypedHooks';

interface Props {
  option: string;
  index: number;
  onClick: () => void;
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

const SelectionElement: React.FC<Props> = ({ option, index, onClick }) => {
  const darkMode = useAppSelector((state: RootState) => state.darkMode);
  return (
    <ListContainer $darkMode={darkMode} onClick={onClick} tabIndex={0}>
      <ListIcon>{choicesTitle[index]}</ListIcon>
      <ListTitle $darkMode={darkMode}>{option}</ListTitle>
    </ListContainer>
  );
};

export default SelectionElement;
