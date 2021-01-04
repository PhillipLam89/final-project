import React from 'react';
import NavBar from './navBar';
import Loader from './loader';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  render() {
    if (this.state.isLoading) return <Loader />;

    return (
      <div className="result-container text-center">
          <h2>Favorites:</h2>
        <NavBar />
      </div>
    );
  }
}
