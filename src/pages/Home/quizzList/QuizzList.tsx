import { useQuery } from '@apollo/client';
import { useAppSelector } from '../../../hooks/reduxTypedHooks';
import { RootState } from '../../../redux/store';
import { GET_QUIZZES } from '../../../graphql/queries';
import { ListContainer, QuizzListContainer } from './style';
import { quizz } from '../../../interfaces/interfaces';
import { Link } from 'react-router-dom';
import Icons from '../../../components/icons/Icons';

const QuizzList: React.FC = () => {
  const darkMode = useAppSelector((state: RootState) => state.darkMode);
  const { data, loading, error } = useQuery(GET_QUIZZES);

  if (loading)
    return (
      <QuizzListContainer $darkMode={darkMode}>Loading...</QuizzListContainer>
    );

  if (error)
    return (
      <QuizzListContainer $darkMode={darkMode}>
        Error! ${error.message}
      </QuizzListContainer>
    );

  return (
    <ListContainer data-testid="list-test">
      {data &&
        data.quizzes.map((quizz: quizz) => {
          return (
            <QuizzListContainer $darkMode={darkMode} key={quizz.id}>
              <Link to={`/quiz/${quizz.id}`} className='link'>
                <Icons
                  title={quizz.title}
                  icon={quizz.icon}
                  color={quizz.color}
                />
              </Link>
            </QuizzListContainer>
          );
        })}
    </ListContainer>
  );
};

export default QuizzList;
