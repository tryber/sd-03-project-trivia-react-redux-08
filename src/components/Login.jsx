import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { getTriviaToken } from '../services/endpoints_API';
import { setUserInfo } from '../actions/actionsCreators';
import '../styles/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: '',
      userName: '',
      token: '',
    };
  }

  handleStateChange(field, value) {
    this.setState((state) => ({
      ...state,
      [field]: value,
    }));
  }

  validadeEmail() {
    const { userEmail } = this.state;
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$/.test(userEmail);
  }

  async handleGame() {
    const { setUserInfoStore } = this.props;
    const userToken = await getTriviaToken();
    this.setState((state) => ({
      ...state,
      token: userToken.token,
    }));
    localStorage.setItem('token', `${userToken.token}`);
    setUserInfoStore(this.state);
    return <Redirect to="/game" />;
  }

  renderEmail() {
    const { userEmail } = this.state;

    return (
      <label className="label" htmlFor="input-gravatar-email">
        Email:&nbsp;
        <input
          data-testid="input-gravatar-email"
          id="input-gravatar-email"
          onChange={(e) => this.handleStateChange('userEmail', e.target.value)}
          type="email"
          value={userEmail}
        />
      </label>
    );
  }

  renderName() {
    const { userName } = this.state;

    return (
      <label className="label" htmlFor="input-player-name">
        Nome:&nbsp;
        <input
          data-testid="input-player-name"
          id="input-player-name"
          onChange={(e) => this.handleStateChange('userName', e.target.value)}
          type="text"
          value={userName}
        />
      </label>
    );
  }

  renderButton() {
    const { userName } = this.state;
    const validEmail = this.validadeEmail();
    return (
      <button
        data-testid="btn-play"
        disabled={!(validEmail && userName)}
        onClick={() => this.handleGame()}
        type="button"
      >
        Jogar
      </button>
    );
  }

  render() {
    return (
      <div className="login-form">
        <div className="form">
          <Link
            className="label"
            data-testid="btn-settings"
            to="/settings"
          >
            Configurações
          </Link>
          <br />
          <br />
          {this.renderEmail()}
          <br />
          {this.renderName()}
          <br />
          {this.renderButton()}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  setUserInfoStore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUserInfoStore: (userData) => dispatch(setUserInfo(userData)),
});

export default connect(null, mapDispatchToProps)(Login);
