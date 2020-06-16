import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTimer, timeOut } from '../actions/actionsCreators';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    this.handleTimer();
  }

  componentWillUnmount() {
    clearInterval(this.handleTimer());
  }

  handleTimer() {
    return setInterval(() => {
      const { seconds } = this.state;
      const { questionAnswered, startTimer, endTimer } = this.props;
      if (seconds > 0 && questionAnswered === false) {
        return this.setState((state) => ({
          seconds: state.seconds - 1,
        }));
      }
      if (seconds === 0 && questionAnswered === false) {
        endTimer();
        return clearInterval(this.handleTimer());
      }
      startTimer();
      return clearInterval(this.handleTimer());
    }, 1000);
  }

  render() {
    const { seconds } = this.state;
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
  startTimer: PropTypes.func.isRequired,
  endTimer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questionAnswered: state.gameInfo.answered,
});

const mapDispatchToProps = (dispatch) => ({
  startTimer: () => dispatch(setTimer()),
  endTimer: () => dispatch(timeOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
