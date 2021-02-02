import React from 'react';
import NavBar from './navBar'
export default class WriteReview extends React.Component {

  render() {
    return (
      <div>
        <p className="text-center d-flex justify-content-center"> {<p className="text-danger pr-2">{this.props.hotelName}</p>}Review </p>
        <NavBar />
      </div>
    );
  }
}
