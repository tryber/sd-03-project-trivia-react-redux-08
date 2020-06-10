import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import hashedMail from '../services/encrypt_mail';
import '../styles/Header.css';

function Header(props) {
  const { userName, score, userEmail } = props;
  const hash = hashedMail(userEmail);
  return (
    <header className="header-feedback-and-game">
      <div>
        <img
          className="img-from-gravatar"
          src={`https://www.gravatar.com/avatar/${hash}?d=https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3`}
          alt={`${userName} avatar`}
          data-testid="header-profile-picture"
        />
        <span className="player-name" data-testid="header-player-name">Jogador: {userName}</span>
      </div>
      <div>
        <h3 className="player-score" data-testid="header-score">{`Placar:${score}`}</h3>
      </div>
    </header>
  );
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.triviaInfo.data,
});

export default connect(mapStateToProps)(Header);
