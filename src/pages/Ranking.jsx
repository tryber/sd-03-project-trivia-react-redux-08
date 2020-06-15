import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Rank from '../components/Rank';

function Ranking({ isLogged }) {
  if (isLogged) {
    return (
      <div>
        <h1>Ranking</h1>
        <Header />
        <Rank />
      </div>
    );
  }
  return (<h1><Link to="/">Oops! Please, log to play!</Link></h1>);
}

Ranking.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({ isLogged: state.userInfo.isLogged });

export default connect(mapStateToProps)(Ranking);
