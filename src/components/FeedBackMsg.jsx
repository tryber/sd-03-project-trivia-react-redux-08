import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const FeedBackMsg = ({ assertions }) => (assertions >= 3 ? (
  <p data-testid="feedback-text">Mandou bem!</p>
) : (
  <p data-testid="feedback-text">Podia ser melhor!</p>
));

FeedBackMsg.prototype = {
  assertions: PropTypes.number.isRequired,
}

const mapStateToProps = ({ gameInfo }) => ({
  assertions: gameInfo.assertions,
});

export default connect(mapStateToProps)(FeedBackMsg);
