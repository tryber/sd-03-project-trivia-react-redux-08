import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTimer, timeOut } from '../actions/actionsCreators';

class Timer extends Component {
  componentDidMount() {
    this.handleTimer();
  }

  componentWillUnmount() {
    clearInterval(this.handleTimer());
  }

  handleTimer() {
    return setInterval(() => {
      const {
        questionAnswered, seconds, startTimer, endTimer,
      } = this.props;
      if (seconds > 0 && questionAnswered === false) {
        return startTimer();
      }
      if (seconds === 0 && questionAnswered === false) {
        endTimer();
        return clearInterval(this.timerOn);
      }
      return clearInterval(this.timerOn);
    }, 1000);
  }

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
  endTimer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questionAnswered: state.gameInfo.answered,
  seconds: state.timerInfo.timer,
});

const mapDispatchToProps = (dispatch) => ({
  startTimer: () => dispatch(setTimer()),
  endTimer: () => dispatch(timeOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
