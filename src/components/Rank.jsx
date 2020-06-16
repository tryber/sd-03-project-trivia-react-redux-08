import React from 'react';
import { connect } from 'react-redux';

class Rank extends React.Component {
  render() {
    const rank = JSON.parse(localStorage.getItem('ranking'));
    console.log(rank[0]);
    return (
      <div>
        <h2
          data-testid="ranking-title"
        >
          Ranking
        </h2>
        <ol>
          {rank.map((player, index) => (
            <li key={`${player.name}_${player.score}`}>
              <img src={player.picture} alt="player pic" />
              <h3 data-testid={`player-name-${index}`}>{player.name}</h3>
              <h4 data-testid={`player-score-${index}`}>{player.score}</h4>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  islogged: state,
});

export default connect(mapStateToProps)(Rank);
