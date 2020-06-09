import React from 'react';
import PropTypes from 'prop-types';

function TriviaCard({ category, question }) {
  return (
    <>
      <p data-testid="question-category">{category}</p>
      <p data-testid="question-text">{question}</p>
    </>
  );
}

TriviaCard.propTypes = {
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
};

export default TriviaCard;
