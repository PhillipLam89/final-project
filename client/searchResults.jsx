import React from 'react';
import NavBar from './navBar';
import Loader from './loader';
export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.handleTitle = this.handleTitle.bind(this)
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

  handleTitle() {
    if (this.props.geolocationUsed === 'true' && this.props.ratingFilter === '1%2C2%2C3%2C4%2C5') {
      return `Your Nearby Hotels in ${this.props.cityName}`
    } else if (this.props.ratingFilter === '1%2C2%2C3%2C4%2C5') {
      return `All Hotels in ${this.props.cityName}`
    } else {
      return `${this.props.cityName} ${this.props.ratingFilter}-Star Hotels`
    }

  }

  render() {
    if (this.state.isLoading) return <Loader />;
    const hotelList = this.state.hotelList;
    console.log(hotelList)
    const hotelName = hotelList.map((hotel, idx) => {
      return (
        <div key={idx+1} className="row-cols-md-1 p-3 col-12 card-deck card-img-top d-flex justify-content-center hotel-info-container">
          <div key={idx+2} className="card shadow-sm">
            <img key={hotel.thumbnailUrl} src={hotel.optimizedThumbUrls.srpDesktop} className="hotel-img pb-2"></img>
            <div key={idx + 3} className="card-body">
              <a key={idx + 4} href={`#hotel-details?hotelId=${hotelList[idx].id}&thumbnailUrl=${hotel.optimizedThumbUrls.srpDesktop}`}><div key={hotelList[idx].id} className="hotel-name">{hotel.name}</div></a>
              <p key={idx + 5} className="card-text d-flex justify-content-between">
                <small key={idx + 6}>{hotel.neighbourhood}</small>
                    {hotel.guestReviews &&
                      <span key={idx + 7} className="font-weight-bold">{hotel.guestReviews.rating}</span>
                    }
              </p>
          </div>
        </div>
    </div>
    );
  });
    return (
      <div className="hotel-results-list">
        <div className="header text-center"><h3 className="mb-0">
          {this.handleTitle()}
        </h3></div>
        <div className="results-container d-flex justify-content-center rounded">
          <div className="row row-cols-2 row-cols-md-2  mb-5 d-flex justify-content-center results-container p-3 ">
            {hotelName}
          </div>
          <NavBar />
        </div>
      </div>
    );
  }
}
