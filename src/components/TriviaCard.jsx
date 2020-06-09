import React from 'react';
import PropTypes from 'prop-types';
import shuffleQuestions from '../services/shuffleQuestions';

const answers = ({
  correct_answer: correctAnswer,
  incorrect_answers: incorrectAnswers,
}) => [
  ...Object.values({ correctAnswer }),
  ...Object.values({ ...incorrectAnswers }),
];

const findCorrectAnswer = (array, { correct_answer: correctAnswer }) => array
  .find((item) => item === correctAnswer);

const TriviaCard = ({ data }) => {
  const randomTriviaAnswers = shuffleQuestions(answers(data));
  return (
    <section>
      <p data-testid="question-category">{data.category}</p>
      <p>{data.type}</p>
      <p>{data.difficulty}</p>
      <p data-testid="question-text">{data.question}</p>
      {randomTriviaAnswers
        .map((answer, index) => (answer === findCorrectAnswer(randomTriviaAnswers, data) ? (
          <button type="button" data-testid="correct-answer" key={answer}>
            {answer}
          </button>
        ) : (
          <button
            type="button"
            data-testid={`wrong-answer-${index}`}
            key={answer}
          >
            {answer}
          </button>
        )))}
    </section>
  );
};

TriviaCard.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default TriviaCard;
