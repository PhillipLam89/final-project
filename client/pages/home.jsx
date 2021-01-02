import React from 'react';
import NavBar from '../navBar';
export default class Home extends React.Component {

  render() {
    return (
      <>
        <main className="home vh-100 text-center">
          HOME PAGE
          <img className="main-pic" src="https://i.pinimg.com/originals/7e/21/50/7e215029378a8ecca4b78a4cae6d42ea.jpg"></img>
        </main>
        <NavBar />
      </>
    );
  }
}
