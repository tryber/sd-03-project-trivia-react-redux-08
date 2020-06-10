import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchingTriviaQuestions from '../actions/actionsCreators';
import hashedMail from '../services/encrypt_mail';
import TriviaCard from '../components/TriviaCard';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionIndex: 0,
      timer: 30,
    };
  }

  componentDidMount() {
    const {
      getTriviaQuestions, categoryID, difficulty, type,
    } = this.props;
    const token = JSON.parse(localStorage.getItem('token'));
    getTriviaQuestions(token, categoryID, difficulty, type);
  }

  render() {
    const {
      userName, score, userEmail, loggedIn,
    } = this.props;
    const hash = hashedMail(userEmail);
    return loggedIn ? (
      <main>
        <header>
          <img
            src={`https://www.gravatar.com/avatar/${hash}?d=https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3`}
            alt={`${userName} avatar`}
            data-testid="header-profile-picture"
          />
          <span data-testid="header-player-name">{userName}</span>
          <span data-testid="header-score">{`Placar:${score}`}</span>
        </header>
        <TriviaCard />
      </main>
    ) : (
      <h1>Oops! Please, log to play!</h1>
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
  getTriviaQuestions: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
  type: PropTypes.string,
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getTriviaQuestions: (token,
    categoryID,
    difficulty,
    type) => dispatch(fetchingTriviaQuestions(token, categoryID, difficulty, type)),
});

export default connect(null, mapDispatchToProps)(Game);
