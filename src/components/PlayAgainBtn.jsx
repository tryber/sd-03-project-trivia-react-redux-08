import React from 'react';
import { Link } from 'react-router-dom';

const PlayAgainBtn = () => (
  <Link 
    to="/"
    data-testid="btn-play-again"
  >
    JOGAR NOVAMENTE
  </Link>
);

export default PlayAgainBtn;
