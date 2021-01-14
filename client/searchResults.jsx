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
    const displayedList = hotelList.map((hotel, idx) => {
      return (
        <div key={hotel.supplierHotelId} className="card w-50 mb-3 hotel-display-div border border-primary text-center d-flex flex-column justify-content-center align-items-center">
          <a href={`#hotel-details?hotelId=${hotelList[idx].id}`}><div key={hotelList[idx].id} className="hotel-name">{hotel.name}</div></a>
          <img key={hotel.thumbnailUrl} src={hotel.thumbnailUrl} className="hotel-img p-2 w-75 rounded"></img>
        </div>
      );
    });
    return (
      <div className="result-container d-flex justify-content-left ">
        <div className="arrow-div pt-2 d-flex w-100">
          <main className="w-100">
            <div className="header text-left pl-5"><h3>{`${this.props.cityName.toUpperCase()} ${this.props.ratingFilter}-STAR HOTELS:`}</h3></div>
            <div className="p-5">{displayedList}</div>
          </main>
        </div>
        <NavBar />
      </div>
    );
  }
}
