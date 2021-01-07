import React from 'react';

export default class NavBar extends React.Component {

  render() {
    return (
      <nav className="navbar  navbar-light fixed-bottom bottom-nav-abs mb-0 pb-0 d-flex justify-content-space-around rounded-0">
        <a href="#"><img src="./images/home.png" width="30" height="30" className="d-inline-block align-top" alt=""></img></a>
        <a href="#search"><img src="./images/search.png" width="30" height="30" className="d-inline-block align-top" alt=""></img></a>
        <img src="./images/settings.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
        <a href="#favorites"><img src="./images/red-heart.png" width="30" height="30" className="d-inline-block align-top" alt=""></img></a>
        <a href="#register"><img src="./images/user.png" width="30" height="30" className="d-inline-block align-top" alt=""></img></a>
      </nav>
    );
  }
}
