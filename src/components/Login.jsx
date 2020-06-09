import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
    };
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
      <label htmlFor="input-gravatar-email">
        Nome:&nbsp;
        <input
          data-testid="input-gravatar-email"
          id="input-gravatar-email"
          onChange={(e) => this.handleStateChange('email', e.target.value)}
          value={email}
        />
      </label>
    );
  }

  renderName() {
    const { name } = this.state;

    return (
      <label htmlFor="input-player-name">
        Nome:&nbsp;
        <input
          data-testid="input-player-name"
          id="input-player-name"
          onChange={(e) => this.handleStateChange('name', e.target.value)}
          value={name}
        />
      </label>
    );
  }

  render() {
    return (
      <div>
        {this.renderEmail()}
        {this.renderName()}
      </div>
    );
  }
}

export default Login;
