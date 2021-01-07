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
        <div className="hotel-display-div text-center d-flex flex-column justify-content-center align-items-center" key={hotel.supplierHotelId}>
          <a href={`#hotel-details?hotelId=${hotelList[idx].id}?thumbnailUrl=${hotel.thumbnailUrl}`}><div key={hotelList[idx].id} className="hotel-name">{hotel.name}</div></a>
          <img key={hotel.thumbnailUrl} src={hotel.thumbnailUrl} className="hotel-img pb-2"></img>
        </div>
      );
    });
    return (
      <div className="result-container d-flex justify-content-center ">
        <div className="arrow-div align-items-center pt-2 d-flex justify-content-center w-100">
          <main className="justify-content-center w-100">
            <div className="header text-center"><h3>{`${this.props.cityName.toUpperCase()} ${this.props.ratingFilter}-STAR HOTELS:`}</h3></div>
            <div className="hotel-list d-flex flex-column p-1.5">{displayedList}</div>
          </main>
        </div>
        <NavBar />
      </div>
    );
  }
}
