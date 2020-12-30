import React from 'react';

import HotelDetails from './hotelDetails';
import NavBar from './navBar';
import Loader from './loader';
export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: this.props.cityName,
      ratingFilter: this.props.ratingFilter,
      selectedHotel: '',
      hotelList: this.props.hotelList
    };
    this.handleUserSelection = this.handleUserSelection.bind(this);

  }

  handleUserSelection(e) {
    e.preventDefault();
    const hotelList = this.state.hotelList;
    let selectedIndex = null;
    for (let i = 0; i < hotelList.length; i++) {
      if (hotelList[i].name === e.target.textContent) {
        selectedIndex = i;
        break;
      }
    }
    this.setState({ selectedHotel: e.target.textContent, selectedIndex: selectedIndex });
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`/api/search/${this.state.cityName}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const cityId = data.suggestions[0].entities[0].destinationId;
        fetch(`/api/search/list/${cityId}/${this.state.ratingFilter}`).then(response => response.json()).then(data => {
          const hotelList = data.data.body.searchResults.results;

          this.setState({ userInput: this.state.userInput, json: data.data.body, hotelList: hotelList, searchButtonClicked: 'hidden', isLoading: false, ratingFilter: this.state.ratingFilter });

        })
          .catch(err => console.error(err));
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.isLoading) return <Loader />;
    if (this.state.selectedHotel) return <HotelDetails data={this.state} />;
    let displayedList = null;
    if (this.state.isLoading === false) {
      const hotelList = this.state.hotelList;
      displayedList = hotelList.map((hotel, idx) => {
        return (
          <div className="hotel-display-div text-center d-flex flex-column justify-content-center align-items-center" key={hotel.supplierHotelId}>
             <a href={`#hotel-details?hotelId=${hotelList[idx].id}?thumbnailUrl=${hotelList[idx].thumbnailUrl}`}><div key={hotelList[idx].id} className="hotel-name">{hotel.name}</div></a>
            <img key={hotel.thumbnailUrl} src={hotel.thumbnailUrl} className="hotel-img pb-2"></img>
          </div>
        );
      });
    }
    return (
      <div className="result-container d-flex justify-content-center ">
        <div className="arrow-div align-items-center pt-2 d-flex justify-content-center w-100">
          <main className="justify-content-center w-100">
            <div className="header text-center"><h3>{`${this.state.cityName.toUpperCase()} ${this.state.ratingFilter}-STAR HOTELS:`}</h3></div>
            <div className="hotel-list d-flex flex-column p-1.5">{displayedList}</div>
          </main>
        </div>
        <NavBar/>
      </div>
    );
  }
}
