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
    this.setTimer = setInterval(() => {
      const { seconds } = this.state;

      if (seconds <= 30) {
        this.setState((state) => ({
          seconds: state.seconds - 1,
        }));
      }

      if (seconds === 1) {
        clearInterval(this.setTimer);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.setTimer);
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

Timer.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
