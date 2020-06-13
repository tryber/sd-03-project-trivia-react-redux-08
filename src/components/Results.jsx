import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Results = ({ score, assertions }) => {
  return (
    <div>
      <h4>{`Você acertou ${assertions} questões!`}</h4>
      <h4>{`Um total de ${score} pontos`}</h4>
    </div>
  );
}

Results.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = ({ gameInfo }) => ({
  score: gameInfo.score,
  assertions: gameInfo.assertions,
});

export default connect(mapStateToProps)(Results);
