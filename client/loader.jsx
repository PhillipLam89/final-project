import React from 'react';

export default class Loader extends React.Component {

  render() {
    return (
      <div className="loader-container">

        <div className="loader"></div>
        <h2>Searching Hotels...</h2>
      </div>
    );
  }
}