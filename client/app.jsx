import React from 'react';
import Home from './pages/home';
import Favorites from './favorites';
import Search from './search';
import parseRoute from './lib/parse-route';
import HotelDetails from './hotelDetails';
import SearchResults from './searchResults';
import Registration from './registration';
import LogIn from './logIn';
import Reviews from './reviews'
import HotelPhotos from './hotelPhotos'
import NavBar from './navBar'
import WriteReview from './WriteReview'
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '' || route.path === 'logged') {
      return (
        <div>
          <Home currentUser={route.params.get('currentUser')} />
          <NavBar iconClicked="home"/>
        </div>
      )
    } if (route.path === 'search') {
      return (
        <div>
          <Search />
          <NavBar iconClicked="search"/>
        </div>
       )
    } if (route.path === 'hotel-details') {
      return  <HotelDetails hotelId={route.params.get('hotelId')} hotelPhoto={route.params.get('thumbnailUrl')} />;
    } if (route.path === 'search-results') {
      return <SearchResults geolocationUsed={route.params.get('geolocationUsed')} cityName={route.params.get('cityName')} ratingFilter={route.params.get('ratingFilter')} />;
    } if (route.path === 'favorites') {
      return (
        <div>
          <Favorites />
          <NavBar iconClicked="heart"/>
        </div>
      )
    } if (route.path === 'register') {
      return <Registration />;
    } if (route.path === 'login') {
      return (
        <div>
          <LogIn/>
          <NavBar iconClicked="person" />
        </div>
      )
    } if (route.path === 'reviews') {
      return <Reviews hotelId={route.params.get('hotelId')} hotelName={route.params.get('hotelName')}/>
    } if (route.path === 'photos') {
      return <HotelPhotos hotelId={route.params.get('hotelId')} hotelName={route.params.get('hotelName')} />
    } if (route.path === 'write-review') {
      return <WriteReview hotelName={route.params.get('hotelName')} />
    }

}

  render() {
    return (
      <div className="">
        { this.renderPage()}
      </div>
    );
  }
}
