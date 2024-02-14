import React from 'react';
import { DisplayDataContainer } from './style';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import { RootState } from '../../redux/store';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../../graphql/queries';
import { User } from '../../interfaces/interfaces';



const DisplayData: React.FC = () => {
  const darkMode = useAppSelector((state: RootState) => state.darkMode);

  const { data, loading, error } = useQuery(GET_ALL_USERS);

  if (loading)
    return (
      <DisplayDataContainer darkMode={darkMode}>
        Loading ...
      </DisplayDataContainer>
    );
  if (error)
    return (
      <DisplayDataContainer darkMode={darkMode}>
        {error.message}.
      </DisplayDataContainer>
    );

  return (
    <>
      {data &&
        data.users.map((user: User) => (
          <DisplayDataContainer darkMode={darkMode} key={user.id}>
            <ul key={user.id}>
              <li>Name: {user.name}</li>
              <li>Username: {user.username}</li>
              <li>Age: {user.age}</li>
            </ul>
          </DisplayDataContainer>
        ))}
    </>
  );
};

export default DisplayData;
