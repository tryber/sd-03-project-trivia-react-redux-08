import React from 'react';
import { connect } from 'react-redux';


const FeedBackMsg = ({ assertions }) => (assertions >= 3 ? (
  <p data-testid="feedback-text">Mandou bem!</p>
) : (
  <p data-testid="feedback-text">Podia ser melhor!</p> 
)
);

const mapStateToProps = ({ gameInfo }) => ({
  assertions: gameInfo.assertions 
})

export default connect(mapStateToProps)(FeedBackMsg);
