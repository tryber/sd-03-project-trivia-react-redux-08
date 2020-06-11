import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    const { seconds } = this.state;
    const { questionAnswered } = this.props;
    this.setTimer = setInterval(() => {
      if (seconds <= 30 && seconds > 0 && questionAnswered) {
        this.setState((state) => ({
          seconds: state.seconds - 1,
        }));
      }

      if (seconds === 0 && !questionAnswered) {
        clearInterval(this.setTimer);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.setTimer);
  }

  handleTimer() {
    
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
};

const mapStateToProps = (state) => ({
  questionAnswered: state.gameInfo.answered,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
