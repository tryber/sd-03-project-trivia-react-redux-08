import React from 'react';
import { Link } from 'react-router-dom';

class StartBtn extends React.Component {
  render() {
    return (
      <div>
        <Link
          data-testid="btn-go-home"
          to="/"
        >
          Início
        </Link>
      </div>
    );
  }
}

export default StartBtn;
