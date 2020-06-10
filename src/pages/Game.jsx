import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchingTriviaQuestions } from '../actions/actionsCreators';
import hashedMail from '../services/encrypt_mail';
import TriviaCard from '../components/TriviaCard';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nextQuestion: false,
      questionIndex: 0,
      timer: 30,
      timerOn: false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    console.log(token);
    const {
      getTriviaQuestions, categoryID, difficulty, type,
    } = this.props;
    getTriviaQuestions(token, categoryID, difficulty, type);
  }

  updateQuestionIndex() {
    const { questionIndex } = this.state;
    const { triviaData } = this.props;
    this.setState((state) => (questionIndex < triviaData.length
      ? { questionIndex: state.questionIndex + 1 }
      : { questionIndex: 0 }));
  }

  render() {
    const { questionIndex, nextQuestion } = this.state;
    const {
      userName, score, userEmail, isLogged, loading, triviaData,
    } = this.props;
    const hash = hashedMail(userEmail);
    if (isLogged) {
      return loading ? (
        <h1>Loading...</h1>
      ) : (
        <main>
          <header>
            <img
              src={`https://www.gravatar.com/avatar/${hash}?d=https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3`}
              alt={`${userName} avatar`}
              data-testid="header-profile-picture"
            />
            <span data-testid="header-player-userName">{userName}</span>
            <span data-testid="header-score">{`Placar:${score}`}</span>
          </header>
          <TriviaCard data={triviaData[questionIndex]} />
          {nextQuestion && (
            <button type="button" data-test-id="btn-next">
              Próxima
            </button>
          )}
        </main>
      );
    }
    return (
      <h1>
        <Link to="/">Oops! Please, log to play!</Link>
      </h1>
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
  triviaData: PropTypes.arrayOf(PropTypes.object).isRequired,
  difficulty: PropTypes.string,
  getTriviaQuestions: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
  type: PropTypes.string,
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.userInfo.userEmail,
  userName: state.userInfo.userName,
  triviaData: state.triviaInfo.data,
  isLogged: state.userInfo.isLogged,
  loading: state.triviaInfo.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getTriviaQuestions: (token,
    categoryID,
    difficulty,
    type) => dispatch(fetchingTriviaQuestions(token,
    categoryID,
    difficulty,
    type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
