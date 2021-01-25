import React from 'react';
import NavBar from './navBar';
import Loader from './loader';
import fetch from 'node-fetch';


export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesData: '',
      isLoading: true,
      filteredFavorites: []

    };
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove(e) {
    e.preventDefault()
    let removalId = ''
    const filteredFavorites = this.state.favoritesData.filter(favorite => {
      if (favorite.hotelId === Number(e.target.dataset.hotelId)) removalId = favorite.hotelId
      return favorite.hotelId !== Number(e.target.dataset.hotelId)
    });
    fetch(`/api/1/${removalId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => {
        this.setState({ isLoading: false,  favoritesData : filteredFavorites});
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }


  componentDidMount() {

    fetch('/api/1/favorites')
      .then(response => {
        return response.json();
      })
      .then(data => {

        this.setState({ favoritesData: data, isLoading: false })
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
          <div key={idx} className="">{info.hotelName}<img data-hotel-id={info.hotelId} onClick={this.handleRemove} className={`pl-3 mb-1 trash-icon`} width="35rem" src="./images/trash.png"></img></div>
        );
      });
      return (
        <div className="result-container vh-100  pt-3 d-block d-flex flex-column text-center">
          <h2 className="mb-2 fav">Favorites <img width="45rem" src="./images/red-heart.png" className="fav-button"></img></h2>
          <div className="fav-hotel-div">{favoriteHotels}</div>
          <NavBar />
        </div>
      );
    }
  }
}
