import React from 'react';
import { Link } from 'react-router-dom';
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

export default Login;
