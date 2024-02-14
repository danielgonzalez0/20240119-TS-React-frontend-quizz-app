import React from 'react';
import { DisplayDataContainer } from './style';
import { useAppSelector } from '../../hooks/reduxTypedHooks';

const DisplayData: React.FC = () => {
 const darkMode = useAppSelector((state) => state.darkMode);

  return (
    <DisplayDataContainer darkMode={darkMode}>
      Display
    </DisplayDataContainer>
  );
};

export default DisplayData;
