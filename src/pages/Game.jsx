import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  fetchingTriviaQuestions,
  correctAnswer,
  wrongAnswer,
  nextQuestion,
} from '../actions/actionsCreators';
import Header from '../components/Header';
import TriviaCard from '../components/TriviaCard';
import NextButton from '../components/NextButton';

function updatePlayerInfo(score, assertions, name, email) {
  const state = {
    player: {
      name,
      assertions,
      score,
      gravatarEmail: email,
    },
  };
  return localStorage.setItem('state', JSON.stringify(state));
}

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionIndex: 0,
      timer: 30,
    };

    this.updateQuestionIndex = this.updateQuestionIndex.bind(this);
    this.clickOnCorrect = this.clickOnCorrect.bind(this);
    this.clickOnWrong = this.clickOnWrong.bind(this);
  }

  componentDidMount() {
    const token = JSON.parse(localStorage.getItem('token'));
    const {
      getTriviaQuestions,
      categoryID,
      difficulty,
      type,
      score,
      assertions,
      userName,
      userEmail,
    } = this.props;
    updatePlayerInfo(score, assertions, userName, userEmail);
    getTriviaQuestions(token, categoryID, difficulty, type);
  }

  updateQuestionIndex() {
    const { questionIndex } = this.state;
    const { triviaData, nextTriviaCard } = this.props;
    if (questionIndex < triviaData.length) {
      this.setState((state) => ({ questionIndex: state.questionIndex + 1 }));
      return nextTriviaCard();
    }
    nextTriviaCard();
    return this.setState({ questionIndex: 0 });
  }

  updateScore(prevScore) {
    const { questionIndex, timer } = this.state;
    const { triviaData } = this.props;
    switch (triviaData[questionIndex].difficulty) {
      case 'easy':
        return (10 + (timer * 1) + prevScore);
      case 'medium':
        return (10 + (timer * 2) + prevScore);
      case 'hard':
        return (10 + (timer * 3) + prevScore);
      default:
        return 0;
    }
  }

  clickOnCorrect() {
    const {
      score, assertions, correctOption, userName, userEmail,
    } = this.props;
    const updatedScore = this.updateScore(score);
    const updatedAssertions = assertions + 1;
    updatePlayerInfo(updatedScore, updatedAssertions, userName, userEmail);
    return correctOption(updatedScore, updatedAssertions);
  }

  clickOnWrong() {
    const { wrongOption } = this.props;
    return wrongOption();
  }

  render() {
    const { questionIndex } = this.state;
    const {
      isLogged, loading, triviaData, answeredQuestion,
    } = this.props;
    if (isLogged) {
      return loading ? (
        <h1>Loading...</h1>
      ) : (
        <main>
          <Header />
          <TriviaCard
            data={triviaData[questionIndex]}
            disabled={answeredQuestion}
            onCorrect={this.clickOnCorrect}
            onWrong={this.clickOnWrong}
          />
          {answeredQuestion && (
            <NextButton
              condition={questionIndex === triviaData.length - 1}
              onClick={this.updateQuestionIndex}
            />
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
  type: PropTypes.string,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  correctOption: PropTypes.func.isRequired,
  wrongOption: PropTypes.func.isRequired,
  nextTriviaCard: PropTypes.func.isRequired,
  answeredQuestion: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.userInfo.userEmail,
  userName: state.userInfo.userName,
  triviaData: state.triviaInfo.data,
  isLogged: state.userInfo.isLogged,
  loading: state.triviaInfo.loading,
  score: state.gameInfo.score,
  assertions: state.gameInfo.assertions,
  answeredQuestion: state.gameInfo.answered,
});

const mapDispatchToProps = (dispatch) => ({
  getTriviaQuestions: (token,
    categoryID,
    difficulty,
    type) => dispatch(fetchingTriviaQuestions(token,
    categoryID,
    difficulty,
    type)),
  correctOption: (score, assertions) => dispatch(correctAnswer(score, assertions)),
  wrongOption: () => dispatch(wrongAnswer()),
  nextTriviaCard: () => dispatch(nextQuestion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
