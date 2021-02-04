import React from 'react';

export default class NavBar extends React.Component {

  render() {
    return (
      <nav className="navbar bg-dark fixed-bottom pt-1 mb-0 pb-3 d-flex justify-content-space-around rounded-0">
        <a href="#"  className={this.props.iconClicked === 'home' ? 'bi bi-house-door text-warning h3 indicator' : 'bi bi-house-door text-white h3'}><i></i></a>
        <a href="#search"><i  className={this.props.iconClicked === 'search' ? 'bi bi-search text-warning h3 indicator' : 'bi bi-search text-white h3'}></i></a>
        <a href="#favorites"><i  className={this.props.iconClicked === 'heart' ? 'bi bi-suit-heart text-warning h3 indicator' : 'bi bi-suit-heart text-white h3'}></i></a>
        <a href="#see-reviews"><i className={this.props.iconClicked === 'reviews' ? 'bi bi-book text-warning h3 indicator' : 'bi bi-book text-white h3'}></i></a>
        <a href="#login"><i className={this.props.iconClicked === 'person' ? 'bi bi-person text-warning h3 indicator' : 'bi bi-person text-white h3'}></i></a>
      </nav>
    );
  }
}
