import React from 'react';

export default class NavBar extends React.Component {

  render() {
    return (
      <nav className="navbar bg-dark fixed-bottom h-10 mb-0 pb-3 d-flex justify-content-space-around rounded-0">
        <a className="" href="#"><i className="bi bi-house-door text-white"></i></a>
        <a href="#search"><i className="bi bi-search text-white"></i></a>
        <a href="#favorites"><i className="bi bi-suit-heart text-white"></i></a>
        <a href="#login"><i className="bi bi-person text-white"></i></a>
      </nav>
    );
  }
}
