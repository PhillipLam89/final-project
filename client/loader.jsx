import React from 'react';

export default class Loader extends React.Component {

  render() {
    return (
      <div className="loader d-flex justify-content-center">
        <div className="spinner-border" role="status">

        </div>
        <h3>Searching Hotels...</h3>
      </div>
    );
  }
}
