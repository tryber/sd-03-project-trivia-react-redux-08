import React from 'react';
import { connect } from 'react-redux';

class Rank extends React.Component {
  render() {
    return (
      <div>
        <p>placeholder</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  islogged: state.userInfo,
});

export default connect(mapStateToProps)(Rank);
