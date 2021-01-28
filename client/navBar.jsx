import React from 'react';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconClicked: ''
    };
    this.handleNavBarClick = this.handleNavBarClick.bind(this);
  }

  handleNavBarClick(e) {
    if (e.target.className.includes('house')) this.setState({ iconClicked: 'home'})
    else if (e.target.className.includes('search')) this.setState({ iconClicked: 'search' })
    else if (e.target.className.includes('heart')) this.setState({ iconClicked: 'heart' })
    else if (e.target.className.includes('person')) this.setState({ iconClicked: 'person' })
  }
  render() {
    return (
      <nav className="navbar bg-dark fixed-bottom pt-1 mb-0 pb-3 d-flex justify-content-space-around rounded-0">
        <a href="#" onClick={this.handleNavBarClick} className={this.props.iconClicked === 'home' ? 'bi bi-house-door text-warning h3 indicator' : 'bi bi-house-door text-white h3'}><i></i></a>
        <a href="#search"><i onClick={this.handleNavBarClick} className={this.props.iconClicked === 'search' ? 'bi bi-search text-warning h3 indicator' : 'bi bi-search text-white h3'}></i></a>
        <a href="#favorites"><i onClick={this.handleNavBarClick} className={this.props.iconClicked === 'heart' ? 'bi bi-suit-heart text-warning h3 indicator' : 'bi bi-suit-heart text-white h3'}></i></a>
        <a href="#login"><i onClick={this.handleNavBarClick} className={this.props.iconClicked === 'person' ? 'bi bi-person text-warning h3 indicator' : 'bi bi-person text-white h3'}></i></a>
      </nav>
    );
  }
}
