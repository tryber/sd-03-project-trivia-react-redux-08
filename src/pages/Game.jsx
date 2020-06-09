import React from 'react';
import PropTypes from 'prop-types';
import hashedMail from '../services/encrypt_mail';

function Game({ user, score, email }) {
  const hash = hashedMail(email);
  return (
    <main>
      <header>
        <img
          src={`https://www.gravatar.com/avatar/${hash}?d=https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3`}
          alt={`${user} avatar`}
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{user}</span>
        <span data-testid="header-score">
          `Placar:$
          {score}
          `
        </span>
      </header>
    </main>
  );
}

Game.propTypes = {
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  user: PropTypes.string.isRequired,
};

export default Game;
