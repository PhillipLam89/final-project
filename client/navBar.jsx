import React from 'react';
import HotelDetails from './hotelDetails'
import Home from './pages/home'
import Search from './search'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchIconClicked: false
    };

  }
  render() {
    if (this.state.searchIconClicked) return <Search />
    return (
      <nav className="navbar navbar-light bottom-nav-abs mb-0 pb-0 d-flex justify-content-space-around">
        <img  src="./images/home.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
        <img  src="./images/search.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
        <img src="./images/settings.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
        <img src="./images/red-heart.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
        <img src="./images/user.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
      </nav>
    );
  }
}
