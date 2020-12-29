import React from 'react';
import Search from './search';
import Home from './pages/home';

import NavBar from './navBar';
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
    } else if (route.path === '#hotel-details') {
      return <Search />;
    }
  }

  render() {
    return (
      <div className="">
        { this.renderPage}
        <NavBar />
      </div>
    );
  }
}
