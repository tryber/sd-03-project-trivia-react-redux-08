import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  fetchingTriviaQuestions,
  correctAnswer,
  wrongAnswer,
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
  localStorage.setItem('state', JSON.stringify(state));
}

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nextQuestion: false,
      questionIndex: 0,
      timer: 30,
      timerOn: false,
    };

    this.updateQuestionIndex = this.updateQuestionIndex.bind(this);
    this.clickOnCorrect = this.clickOnCorrect.bind(this);
    this.clickOnWrong = this.clickOnWrong.bind(this);
  }

  componentDidMount() {
    const token = JSON.parse(localStorage.getItem('token'));
    const {
      getTriviaQuestions, categoryID, difficulty, type,
    } = this.props;
    getTriviaQuestions(token, categoryID, difficulty, type);
  }

  updateQuestionIndex() {
    const { questionIndex } = this.state;
    const { triviaData } = this.props;
    if (questionIndex < triviaData.length) {
      return this.setState((state) => ({
        questionIndex: state.questionIndex + 1,
        nextQuestion: false,
      }));
    }
    return this.setState({ questionIndex: 0, nextQuestion: false });
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
    this.setState((state) => ({ nextQuestion: !state.nextQuestion }));
    return correctOption(updatedScore, updatedAssertions);
  }

  clickOnWrong() {
    const { wrongOption } = this.props;
    this.setState((state) => ({ nextQuestion: !state.nextQuestion }));
    return wrongOption();
  }

  render() {
    const { questionIndex, nextQuestion } = this.state;
    const {
      isLogged, loading, triviaData,
    } = this.props;
    if (isLogged) {
      return loading ? (
        <h1>Loading...</h1>
      ) : (
        <main>
          <Header />
          <TriviaCard
            data={triviaData[questionIndex]}
            disabled={nextQuestion}
            onCorrect={this.clickOnCorrect}
            onWrong={this.clickOnWrong}
          />
          {nextQuestion && (
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
};

const mapStateToProps = (state) => ({
  userEmail: state.userInfo.userEmail,
  userName: state.userInfo.userName,
  triviaData: state.triviaInfo.data,
  isLogged: state.userInfo.isLogged,
  loading: state.triviaInfo.loading,
  score: state.gameInfo.score,
  assertions: state.gameInfo.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  getTriviaQuestions: (token,
    categoryID,
    difficulty,
    type) => dispatch(fetchingTriviaQuestions(token, categoryID, difficulty, type)),
  correctOption: (score, assertions) => dispatch(correctAnswer(score, assertions)),
  wrongOption: () => dispatch(wrongAnswer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
