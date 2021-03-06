
import React from 'react';
import NavBar from './navBar';
import Loader from './loader';
import fetch from 'node-fetch';

export default class HotelDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hotelData: '',
      isLoading: true,
      favorited: false,
      neighborhood: ''
    };
    this.handleFavorites = this.handleFavorites.bind(this);
  }

  handleFavorites(e) {
    e.preventDefault();
    fetch(`/api/favorites/1/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "hotelName": this.state.hotelData.propertyDescription.name,
        "hotelId": this.props.hotelId
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ favorited: !this.state.favorited });
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`/api/hotels/${this.props.hotelId}`)
      .then(response => {
        return response.json();
      })
      .then(data => {

        this.setState({ hotelData: data.data.body, isLoading: false, neighborhood: data.neighborhood });

        return fetch(`/api/weather/${this.state.hotelData.pdpHeader.hotelLocation.coordinates.latitude}/${this.state.hotelData.pdpHeader.hotelLocation.coordinates.longitude}`)
          .then(response => {
            return response.json()
          })
          .then(data => {
            this.setState({ weatherInfo: data.currently })
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.isLoading) return <Loader />;
    else if (this.state.weatherInfo && this.state.hotelData && !this.state.isLoading) {
      const hotelName = this.state.hotelData.propertyDescription.name;
      const badge = this.state.hotelData.guestReviews.brands.badgeText;
      const rating = this.state.hotelData.guestReviews.brands.rating;

      const aboutList = this.state.hotelData.atAGlance.keyFacts.arrivingLeaving.map((hotelFact, idx) => {
        return (
          <p key={idx} className="policies">{hotelFact}</p>
        );
      });

      const hotelSize = this.state.hotelData.atAGlance.keyFacts.hotelSize.map((hotelSizeFact, idx) => {
        return (
          <p key={idx} className="policies">{hotelSizeFact}</p>
        );
      });

      const hotelRoomTypes = this.state.hotelData.propertyDescription.roomTypeNames.map((roomName, idx) => {
        return (
          <p key={idx} className="policies">{`${roomName}`}</p>
        );
      });

      const hotelDiningInfo = this.state.hotelData.amenities[0].listItems[1].listItems;
      const hotelDiningServices = hotelDiningInfo.map((diningService, idx) => {
        return (
          <p key={idx}>{`${diningService}`}</p>
        );
      });

      const isPriceAvailable = this.state.hotelData.propertyDescription.featuredPrice
      const hotelAmenities = this.state.hotelData.amenities[0].listItems;
      const amenityListHotel = hotelAmenities.map((amenity, idx) => {
        return (
          <p key={idx}>{`${amenity.listItems.join(', ')}`}</p>
        );
      });

      const roomAmenities = this.state.hotelData.amenities[1].listItems;
      const amenityList = roomAmenities.map((amenity, idx) => {
        return (
          <p key={idx}>{`${amenity.listItems.join(', ')} `}</p>
        );
      });

      const { apparentTemperature, humidity, precipProbability} = this.state.weatherInfo
      const icon = this.state.weatherInfo.icon.replaceAll('-', ' ')

      return (
        <div className="vh-75 hotel-details-page">
          <div className="border rounded mb-5">
            <div className="big-container p-3 vh-20 d-flex flex-column align-items-center">
              <div className="d-flex justify-content-between w-100 pr-2">
                <h3 className="w-100 d-flex justify-content-start bg-light">{hotelName}</h3>
                <i onClick={this.handleFavorites} className={this.state.favorited ? 'bi bi-suit-heart-fill fav-button heart text-danger' : 'bi bi-heart fav-button heart'}></i>
              </div>
              <p className={this.state.favorited ? 'text-muted w-100 d-flex justify-content-end' : 'd-none'}>added to favorites</p>
              <p className="w-100 d-flex justify-content-start">{this.state.hotelData.propertyDescription.address.fullAddress}</p>
              <img width="100%" src={this.state.neighborhood.neighborhoodImage}></img>
              <div className="d-flex justify-content-between w-100">
                <p>{`Average User Rating: ${badge} ${rating}/10`}</p>
                <a href={`#reviews?hotelId=${this.state.hotelData.pdpHeader.hotelId}&hotelName=${this.state.hotelData.propertyDescription.name}`}>See Reviews<i className="bi bi-chat-fill pl-3"></i></a>
              </div>
              <div className="w-100 d-flex justify-content-start">
                <p className="w-100">Average Price: {!isPriceAvailable ? 'unknown' : this.state.hotelData.propertyDescription.featuredPrice.currentPrice.formatted}</p>
                <a className="d-flex" href={`#photos?hotelId=${this.state.hotelData.pdpHeader.hotelId}&hotelName=${this.state.hotelData.propertyDescription.name}`}>Photos<i className="bi bi-camera pl-3"></i></a>
              </div>
              <div className="w-100">
                <p>Current Weather: {`${apparentTemperature.toFixed(0)}°F ${icon}`}</p>
                <p>Current Humidity: {(humidity * 100).toFixed(0) + ' %'}</p>
                <p>Chance of Rain: {(precipProbability * 100).toFixed(0) + ' %'}</p>
              </div>
            </div>
            <div className="accordion" id="accordionExample">
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h2 className="mb-0 ">
                    <button className="btn btn-link pl-0 text-dark " type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      <h4>Fact Sheet</h4>
                    </button>
                  </h2>
                </div>
                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">

                  <main>
                    <div className="card-body  d-flex flex-column justify-content-between">
                      <div className="d-flex justify-content-between pb-4">
                        <p className="font-weight-bold">Check in & Check out</p>
                        <div className="w-50 ">{aboutList}</div>
                      </div>
                      <div className="d-flex justify-content-between pb-4">
                        <p className="font-weight-bold">Hotel Size</p>
                        <div className="w-50 ">{hotelSize}</div>
                      </div>
                      <div className="d-flex justify-content-between pb-4">
                        <p className="font-weight-bold">Room Types</p>
                        <div className="w-50 ">{hotelRoomTypes}</div>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h2 className="mb-0 ">
                    <button className="btn btn-link collapsed pl-0 text-dark " type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      <h4>Dining & Entertainment</h4>
                    </button>
                  </h2>
                </div>
                <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                  <div className="card-body ">
                    {hotelDiningServices}
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingThree">
                  <h2 className="mb-0 ">
                    <button className="btn btn-link collapsed text-dark" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      <h4>Amenities</h4>
                    </button>
                  </h2>
                </div>
                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                  <div>
                    <div className="card-body  d-flex flex-column justify-content-between">
                      <div className="d-flex justify-content-between pb-4">
                        <p className="font-weight-bold">In Hotel:</p>
                        <div className="w-50 ">{amenityListHotel}</div>
                      </div>
                      <div className="d-flex justify-content-between pb-4">
                        <p className="font-weight-bold">In Room:</p>
                        <div className="w-50 ">{amenityList}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <NavBar />
        </div>
      );
    }
    return <h1 className={this.state.hotelData ? 'd-none' : 'text-center'}>Failed to fetch data from the server, please try again...</h1>
  }
}
