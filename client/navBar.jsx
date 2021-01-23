import React from 'react';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconClicked: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (e.target.className.includes('house')) this.setState({ iconClicked: 'home'})
    else if (e.target.className.includes('search')) this.setState({ iconClicked: 'search' })
    else if (e.target.className.includes('heart')) this.setState({ iconClicked: 'heart' })
    else if (e.target.className.includes('person')) this.setState({ iconClicked: 'person' })
  }
  render() {
    return (
      <nav className="navbar bg-dark fixed-bottom pt-1 h-10 mb-0 pb-3 d-flex justify-content-space-around rounded-0">
        <a onClick={this.handleClick} className={this.state.iconClicked === 'home' ? 'bi bi-house-door text-primary' : 'bi bi-house-door text-white'} href="#"><i></i></a>
        <a href="#search"><i onClick={this.handleClick} className={this.state.iconClicked === 'search' ? 'bi bi-search text-primary' : 'bi bi-search text-white'}></i></a>
        <a href="#favorites"><i onClick={this.handleClick} className={this.state.iconClicked === 'heart' ? 'bi bi-suit-heart text-primary' : 'bi bi-suit-heart text-white'}></i></a>
        <a href="#login"><i onClick={this.handleClick} className={this.state.iconClicked === 'person' ? 'bi bi-person text-primary' : 'bi bi-person text-white'}></i></a>
      </nav>
    );
  }
}
