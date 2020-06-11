import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchingTriviaQuestions } from '../actions/actionsCreators';
import Header from '../components/Header';
import TriviaCard from '../components/TriviaCard';
import NextButton from '../components/NextButton';

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
  }

  componentDidMount() {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token);
    const {
      getTriviaQuestions, categoryID, difficulty, type,
    } = this.props;
    getTriviaQuestions(token, categoryID, difficulty, type);
  }

  updateQuestionIndex() {
    const { questionIndex } = this.state;
    const { triviaData } = this.props;
    if (questionIndex < triviaData.length) {
      return this.setState((state) => ({ questionIndex: state.questionIndex + 1 }));
    }
    return this.setState({ questionIndex: 0 });
  }

  calculateScore() {

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
          <TriviaCard data={triviaData[questionIndex]} />
          {nextQuestion && (
            <NextButton
              condition={questionIndex === triviaData.length}
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
