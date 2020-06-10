import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import setUserInfo from '../actions/actionsCreators';
import '../styles/Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
    };
  }

  submitData() {
    const { email, name } = this.state;
    console.log(email, name, 'were submited');
  }

  handleStateChange(field, value) {
    this.setState((state) => ({
      ...state,
      [field]: value,
    }));
  }

  requestToken() {
    // request token to the api
    const { name, email } = this.state;
    console.log(name, email, 'foi eviada a requisição');
  }

  saveToken() {
    // Save token to local storage
  }

  handlePlay() {
    // fires the functions to start playing
  }

  renderEmail() {
    const { email } = this.state;

    return (
      <label className="label" htmlFor="input-gravatar-email">
        Email:&nbsp;
        <input
          data-testid="input-gravatar-email"
          id="input-gravatar-email"
          onChange={(e) => this.handleStateChange('email', e.target.value)}
          type="email"
          value={email}
        />
      </label>
    );
  }

  renderName() {
    const { name } = this.state;

    return (
      <label className="label" htmlFor="input-player-name">
        Nome:&nbsp;
        <input
          data-testid="input-player-name"
          id="input-player-name"
          onChange={(e) => this.handleStateChange('name', e.target.value)}
          type="text"
          value={name}
        />
      </label>
    );
  }

  renderButton() {
    const { email, name } = this.state;
    return (
      <button
        data-testid="btn-play"
        disabled={(!(email && name))}
        onClick={() => this.handlePlay()}
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

const mapDispatchToProps = (dispatch) => ({
  setUserInfoStore: (userData) => dispatch(setUserInfo(userData)),
});

export default connect(null, mapDispatchToProps)(Login);
