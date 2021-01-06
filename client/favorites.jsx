import React from 'react';
import NavBar from './navBar';
import Loader from './loader';
import fetch from 'node-fetch';


export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesData: '',
      isLoading: true
    };
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove(e) {
    e.preventDefault()
    e.target.parentElement.className = 'fade1'
    let removalId = null
    let removalName = null
    const data = this.state.favoritesData


    for (let i = 0; i < data.length; i ++) {
      if (data[i].hotelName === e.target.parentElement.innerText) {
        removalName = e.target.parentElement.innerText
        break
      }
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].hotelName === removalName) {
        removalId = data[i].hotelId
        break
      }
    }

    fetch(`/api/1/${removalId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ isLoading: false });
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
          <div key={idx} className={`policies text-center ${idx}`}>{info.hotelName}<img onClick={this.handleRemove} className={`pl-3 mb-1 trash-icon`} width="35rem" src="./images/trash.png"></img></div>
        );
      });

      return (
        <div className="result-container vh-100  pt-3 d-block d-flex flex-column text-center">
          <h2 className="mb-2 fav">Favorites <img src="./images/red-heart.png" className="fav-button"></img></h2>
          <div className="fav-hotel-div">{favoriteHotels}</div>
          <NavBar />
        </div>
      );
    }
  }
}
