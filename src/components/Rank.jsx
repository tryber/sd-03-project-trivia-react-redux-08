import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Rank extends React.Component {
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

const mapStateToProps = (state) => ({
  islogged: state.userInfo,
});

export default connect(mapStateToProps)(Rank);
