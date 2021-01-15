
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
      favorited: false
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
        this.setState({ hotelData: data.data.body, isLoading: false });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.isLoading) return <Loader />;

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
        <p key={idx} className="">{`${diningService}`}</p>
      );
    });

    const isPriceAvailable = this.state.hotelData.propertyDescription.featuredPrice

    const hotelAmenities = this.state.hotelData.amenities[0].listItems;
    const amenityListHotel = hotelAmenities.map((amenity, idx) => {
      return (
        <p key={idx} className="">{`${amenity.listItems}`}</p>
      );
    });

    const roomAmenities = this.state.hotelData.amenities[1].listItems;
    const amenityList = roomAmenities.map((amenity, idx) => {

      return (
        <p key={idx} className="">{`${amenity.listItems} `}</p>
      );
    });

    return (
      <div className="vh-75 text-center hotel-details-page">

        <div className="border border-dark">
          <div className="big-container p-3 text-center vh-20 d-flex flex-column align-items-center">
          <div className="d-flex justify-content-between w-100">
              <p className="w-100 d-flex justify-content-start">{hotelName}</p>
              <i onClick={this.handleFavorites} className={this.state.favorited ? 'bi bi-suit-heart-fill fav-button heart' : 'bi bi-heart fav-button heart'}></i>
          </div>
            <p className={this.state.favorited ? 'text-muted w-100 d-flex justify-content-end' : 'd-none'}>added to favorites</p>
            <p className="w-100 d-flex justify-content-start">{this.state.hotelData.propertyDescription.address.fullAddress}</p>
            <img width="100%" src={this.props.hotelPhoto}></img>


            <div className="d-flex justify-content-between w-100">
              <p>{`Average User Rating: ${badge} ${rating}/10`}</p>
              <a href={`#reviews?hotelId=${this.state.hotelData.pdpHeader.hotelId}&hotelName=${this.state.hotelData.propertyDescription.name}`}>See Reviews<i className="bi bi-chat-fill pl-3"></i></a>
            </div>

            <p className="w-100 d-flex justify-content-start">Average Price: {!isPriceAvailable ? 'unknown' : this.state.hotelData.propertyDescription.featuredPrice.currentPrice.formatted}</p>
          </div>
          <div className="accordion" id="accordionExample">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h2 className="mb-0 text-left">
                  <button className="btn btn-link pl-0 text-dark " type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <h4>Fact Sheet</h4>
                  </button>
                </h2>
              </div>
              <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">

                <main className="">
                  <div className="card-body text-left d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-between pb-4">
                      <p className="font-weight-bold">Check in & Check out</p>
                      <div className="w-50 text-left">{aboutList}</div>
                    </div>
                    <div className="d-flex justify-content-between pb-4">
                      <p className="font-weight-bold">Hotel Size</p>
                      <div className="w-50 text-left">{hotelSize}</div>
                    </div>
                    <div className="d-flex justify-content-between pb-4">
                      <p className="font-weight-bold">Room Types</p>
                      <div className="w-50 text-left">{hotelRoomTypes}</div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0 text-left">
                  <button className="btn btn-link collapsed pl-0 text-dark " type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <h4>Dining & Entertainment</h4>
                  </button>
                </h2>
              </div>
              <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <main className="card-body text-left">
                  {hotelDiningServices}
                </main>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingThree">
                <h2 className="mb-0 text-left">
                  <button className="btn btn-link collapsed text-dark" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    <h4>Amenities</h4>
                 </button>
                </h2>
              </div>
              <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                <main className="">
                  <div className="card-body text-left d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-between pb-4">
                      <p className="font-weight-bold">In Hotel:</p>
                      <div className="w-50 text-left">{amenityListHotel}</div>
                    </div>
                    <div className="d-flex justify-content-between pb-4">
                      <p className="font-weight-bold">In Room:</p>
                      <div className="w-50 text-left">{amenityList}</div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
        <div className="filler">
        </div>
        <NavBar />
      </div>
    );
  }
}
