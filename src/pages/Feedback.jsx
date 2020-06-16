import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FeedBackMsg from '../components/FeedBackMsg';
import Results from '../components/Results';
// import PlayAgainBtn from '../components/PlayAgainBtn';
// import RankingBtn from '../components/RankingBtn';

function Feedback() {
  return (
    <div>
      <h1>Feedback</h1>
      <Header />
      <FeedBackMsg />
      <Results />
      <Link to="/ranking" data-testid="btn-ranking">
        VER RANKING
      </Link>
      <Link to="/" data-testid="btn-play-again">
        JOGAR NOVAMENTE
      </Link>
    </div>
  );
}

export default Feedback;
