import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
    }
  }

  renderEmail() {
    return (
      <Row label="Name">
          Nome:&nbsp;
          <input
            data-testid="input-player-name"
            id="input-player-name"
            onChange={}
            value={name}
            />
        </Row>
    );
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default Login;