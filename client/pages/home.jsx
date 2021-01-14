import React from 'react';
import NavBar from '../navBar';
export default class Home extends React.Component {

  render() {
    return (
      <div>
        <main>
          <h2 className="text-center">Welcome {this.props.currentUser}</h2>
          <img className="main-pic vw-100 vh-100" src="./images/ritz.jfif"></img>
        </main>
        <NavBar />
      </div>
    );
  }
}
