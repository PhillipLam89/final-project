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
        <div className="row-cols-md-1 p-3  card-deck card-img-top d-flex justify-content-center">
          <div className="card  border border-dark">
            <img key={hotel.thumbnailUrl} src={hotel.thumbnailUrl} className="hotel-img pb-2 hotel-pic"></img>
            <div className="card-body">
            <a href={`#hotel-details?hotelId=${hotelList[idx].id}?thumbnailUrl=${hotel.thumbnailUrl}`}><div key={hotelList[idx].id} className="hotel-name">{hotel.name}</div></a>
              <p className="card-text d-flex justify-content-between">
              <span>{hotel.neighbourhood}</span>
              <span className="font-weight-bold">{hotel.guestReviews.rating}</span>
            </p>
          </div>
        </div>
    </div>
    );
  });
    return (
      <div>
        <main className="w-100">
          <div className="header text-center"><h3>{`${this.props.cityName.toUpperCase()} ${this.props.ratingFilter}-STAR HOTELS:`}</h3></div>
        </main>
        <div className="row row-cols-2 row-cols-md-2 h-50 m-0 d-flex justify-content-center results-container">
          {hotelName}
        </div>
        <NavBar />
      </div>
    );
  }
}
