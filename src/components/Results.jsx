import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Results = ({ score, assertions }) => (
  <div>
    <h4 data-testid="feedback-total-question" >{`Você acertou ${assertions || 0} questões!`}</h4>
    <h4 data-testid="feedback-total-score">{`Um total de ${score || 0} pontos!`}</h4>
  </div>
);

Results.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = ({ gameInfo }) => ({
  score: gameInfo.score,
  assertions: gameInfo.assertions,
});

export default connect(mapStateToProps)(Results);
