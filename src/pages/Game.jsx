import React from 'react';

function Game() {
  return (
    <main>
      <header>
        <img src={`https://www.gravatar.com/avatar/${hash}?d=https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3`} alt={`${user} avatar`} data-testid="header-profile-picture" />
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

export default Game;
