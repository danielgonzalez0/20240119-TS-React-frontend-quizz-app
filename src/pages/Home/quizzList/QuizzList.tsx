import { useQuery } from '@apollo/client';
import { useAppSelector } from '../../../hooks/reduxTypedHooks';
import { RootState } from '../../../redux/store';
import { GET_QUIZZES } from '../../../graphql/queries';
import { H2, ListContainer, QuizzListContainer } from './style';
import { quizz } from '../../../interfaces/interfaces';
import { Link } from 'react-router-dom';

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
    <ListContainer>
      {data &&
        data.quizzes.map((quizz: quizz) => {
          return (
            <QuizzListContainer
                $darkMode={darkMode}
                key={quizz.id}
              >
            <Link to={`/quiz/${quizz.id}`}>
                <div
                  className="icon-container"
                  style={{ backgroundColor: `#${quizz.color}` }}
                >
                  <img src={quizz.icon} alt={quizz.title} />
                </div>
                <H2>{quizz.title}</H2>
                </Link>
              </QuizzListContainer>
          );
        })}
    </ListContainer>
  );
};

export default QuizzList;
