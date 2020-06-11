import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTimer, resetTimer } from '../actions/actionsCreators';

class Timer extends Component {
  componentDidMount() {
    this.timerOn = setInterval(() => {
      const { questionAnswered, seconds, startTimer } = this.props;

      if (seconds > 0 && questionAnswered === false) {
        startTimer();
      }
      if (seconds === 0 || questionAnswered === true) {
        clearInterval(this.timerOn);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.handleTimer);
  }

  // handleTimer() {
  //   const { questionAnswered, seconds, startTimer } = this.props;
  //   const timerOn = setInterval(() => ((seconds > 0 && !questionAnswered)
  //     ? startTimer() : clearInterval(timerOn)), 1000);
  //   return timerOn;
  // }

  render() {
    const { seconds } = this.props;
    return (
      <section>
        <p>
          {`Tempo Restante: 
          ${seconds}
          `}
        </p>
      </section>
    );
  }
}

Timer.propTypes = {
  questionAnswered: PropTypes.bool.isRequired,
  seconds: PropTypes.number.isRequired,
  startTimer: PropTypes.func.isRequired,
  updateTimer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questionAnswered: state.gameInfo.answered,
  seconds: state.timerInfo.timer,
});

const mapDispatchToProps = (dispatch) => ({
  startTimer: () => dispatch(setTimer()),
  updateTimer: () => dispatch(resetTimer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
