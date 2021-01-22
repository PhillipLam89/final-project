import React from 'react';
import NavBar from './navBar';
import Loader from './loader';
export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    fetch(`/api/search/${this.props.cityName}/${this.props.ratingFilter}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const hotelList = data;
        this.setState({ hotelList: hotelList, searchButtonClicked: 'hidden', isLoading: false, ratingFilter: this.state.ratingFilter });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.isLoading) return <Loader />;
    const hotelList = this.state.hotelList;
    const hotelName = hotelList.map((hotel, idx) => {
      return (
        <div className="row-cols-md-1 p-3 col-12 card-deck card-img-top d-flex justify-content-center hotel-info-container">
          <div className="card shadow-sm">
            <img key={hotel.thumbnailUrl} src={hotel.thumbnailUrl} className="hotel-img pb-2"></img>
            <div className="card-body">
            <a href={`#hotel-details?hotelId=${hotelList[idx].id}&thumbnailUrl=${hotel.thumbnailUrl}`}><div key={hotelList[idx].id} className="hotel-name">{hotel.name}</div></a>
              <p className="card-text d-flex justify-content-between">
              <small>{hotel.neighbourhood}</small>
              {hotel.guestReviews &&
                  <span className="font-weight-bold">{hotel.guestReviews.rating}</span>
              }

            </p>
          </div>
        </div>
    </div>
    );
  });
    return (
      <div className="hotel-results-list">
        <div className="results-container d-flex justify-content-center">
            <div className="header text-center"><h3 className="mb-0">{`${this.props.cityName.toUpperCase()} ${this.props.ratingFilter}-STAR HOTELS:`}</h3></div>
            <div className="row row-cols-2 row-cols-md-2  mb-5 d-flex justify-content-center results-container p-3 ">
            {hotelName}
          </div>
          <NavBar />
        </div>
      </div>
    );
  }
}
