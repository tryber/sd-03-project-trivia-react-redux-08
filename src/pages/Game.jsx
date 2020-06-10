import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchingTriviaQuestions from '../actions/actionsCreators';
import hashedMail from '../services/encrypt_mail';
import TriviaCard from '../components/TriviaCard';

class Game extends Component {
  componentDidMount() {
    const {
      getTriviaQuestions, categoryID, difficulty, type,
    } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    getTriviaQuestions(token, categoryID, difficulty, type);
  }

  render() {
    const { user, score, email } = this.props;
    const hash = hashedMail(email);
    return (
      <main>
        <header>
          <img
            src={`https://www.gravatar.com/avatar/${hash}?d=https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3`}
            alt={`${user} avatar`}
            data-testid="header-profile-picture"
          />
          <span data-testid="header-player-name">{user}</span>
          <span data-testid="header-score">{`Placar:${score}`}</span>
        </header>
        <TriviaCard />
      </main>
    );
  }
}

Game.defaultProps = {
  categoryID: '',
  difficulty: '',
  type: '',
};

Game.propTypes = {
  categoryID: PropTypes.string,
  difficulty: PropTypes.string,
  email: PropTypes.string.isRequired,
  getTriviaQuestions: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  type: PropTypes.string,
  user: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getTriviaQuestions: (
    token,
    categoryID,
    difficulty,
    type,
  ) => dispatch(fetchingTriviaQuestions(token, categoryID, difficulty, type)),
});

export default connect(null, mapDispatchToProps)(Game);
