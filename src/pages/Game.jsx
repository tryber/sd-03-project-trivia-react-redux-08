import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchingTriviaQuestions } from '../actions/actionsCreators';
import TriviaCard from '../components/TriviaCard';
import Header from '../components/Header';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionIndex: 0,
      timer: 30,
      timerOn: false,
    };
  }

  componentDidMount() {
    const {
      getTriviaQuestions, categoryID, difficulty, type,
    } = this.props;
    const token = localStorage.getItem('token');
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
    const { questionIndex } = this.state;
    const { isLogged, triviaData } = this.props;
    return isLogged ? (
      <main>
        <Header />
        <TriviaCard data={triviaData[questionIndex]} />
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
  triviaData: PropTypes.arrayOf(PropTypes.object).isRequired,
  difficulty: PropTypes.string,
  getTriviaQuestions: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  type: PropTypes.string,
};

const mapStateToProps = (state) => ({
  triviaData: state.triviaInfo.data,
  isLogged: state.userInfo.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  getTriviaQuestions: (token,
    categoryID,
    difficulty,
    type) => dispatch(fetchingTriviaQuestions(token, categoryID, difficulty, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
