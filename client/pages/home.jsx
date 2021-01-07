import React from 'react';
import NavBar from '../navBar';
export default class Home extends React.Component {

  render() {
    return (
      <>
        <main className="home vh-100 text-center">
          HOME PAGE
            <img className="main-pic h-95" src="./images/ritz.jfif"></img>
        </main>
        <NavBar />
      </>
    );
  }
}
