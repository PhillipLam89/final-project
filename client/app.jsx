import React from 'react';
import Home from './pages/home';
import Favorites from './favorites';
import Search from './search';
import parseRoute from './lib/parse-route';
import HotelDetails from './hotelDetails';
import SearchResults from './searchResults';
import Registration from './registration';
import LogIn from './logIn';

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
    if (route.path === '') {
      return <Home />;
    } if (route.path === 'search') {
      return <Search />;
    } if (route.path === 'hotel-details') {
      return <HotelDetails hotelId={route.params.get('hotelId')} />;
    } if (route.path === 'search-results') {
      return <SearchResults cityName={route.params.get('cityName')} ratingFilter={route.params.get('ratingFilter')} />;
    } if (route.path === 'favorites') {
      return <Favorites />;
    } if (route.path === 'register') {
      return <Registration />;
    } if (route.path === 'login') {
      return <LogIn />;
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
