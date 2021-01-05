import React from 'react';
import NavBar from './navBar';
import Loader from './loader';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      favoritesData: '',
      isLoading: true
    };
  }

  componentDidMount() {

    fetch('/api/1/favorites')
      .then(response => {
        return response.json();
      })
      .then(data => {

        this.setState({favoritesData : data, isLoading: false})
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.isLoading) return <Loader />;
    if (this.state.favoritesData) {
      const favoriteHotels = this.state.favoritesData.map((info, idx) => {
        return (
          <div key={idx-1} className="d-flex justify-content-center align-items-center">
            <p key={idx} className="policies text-center">{info.hotelName}</p>
            <img key={idx+1} className="pl-3 mb-3 trash-icon" width="35rem" src="./images/trash.png"></img>
          </div>
        );
      });

      return (
        <div className="result-container vh-100  text-center">
          <h2>Favorites:</h2>
          {favoriteHotels}
          <NavBar />
        </div>
      );
    }
  }
}
