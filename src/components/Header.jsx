import React from 'react';
import { connect } from 'react-redux';
import hashedMail from '../services/encrypt_mail';
import '../styles/Header.css'

function Header(props) {
  const { name, score, email } = props;
  const hash = hashedMail(email);
  return (
    <div className="header-feedback-and-game">
      <div>
        <img
          src={`https://www.gravatar.com/avatar/${hash}?d=https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3`}
          alt={`${name} avatar`}
          data-testid="header-profile-picture"
        />
      </div>
      <div>
        <span data-testid="header-player-name">{name}aa</span>
        <span data-testid="header-score">{`Placar:${score}`}</span>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.userInfo
})

export default connect(mapStateToProps)(Header);
