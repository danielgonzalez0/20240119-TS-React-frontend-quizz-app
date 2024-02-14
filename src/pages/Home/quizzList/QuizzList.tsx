import { useQuery } from '@apollo/client';
import { useAppSelector } from '../../../hooks/reduxTypedHooks';
import { RootState } from '../../../redux/store';
import { GET_QUIZZES } from '../../../graphql/queries';
import { QuizzListContainer } from './style';
import { quizz } from '../../../interfaces/interfaces';

const QuizzList: React.FC = () => {
  const darkMode = useAppSelector((state: RootState) => state.darkMode);
  const { data, loading, error } = useQuery(GET_QUIZZES);

  if (loading)
    return (
      <QuizzListContainer darkMode={darkMode}>Loading...</QuizzListContainer>
    );

  if (error)
    return (
      <QuizzListContainer darkMode={darkMode}>
        Error! ${error.message}
      </QuizzListContainer>
    );

  return (
    <>
      {data &&
        data.quizzes.map((quizz: quizz) => {
          return (
            <QuizzListContainer darkMode={darkMode} key={quizz.id}>
              <img src={quizz.icon} alt={quizz.title} />
              <h2>{quizz.title}</h2>
            </QuizzListContainer>
          );
        })}
    </>
  );
};

export default QuizzList;
