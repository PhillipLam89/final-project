import React from 'react';

export default class Loader extends React.Component {

  render() {
    return (
      <div className="loader-container d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="loader"></div>
        <h2 className="pl-3">Loading...</h2>
      </div>
    );
  }
}
