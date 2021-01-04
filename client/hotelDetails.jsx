
import React from 'react';
import NavBar from './navBar';
import Loader from './loader';

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
    this.setState({ favorited: !this.state.favorited });
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
        <p key={idx} className="">{`${roomName}`}</p>
      );
    });

    const hotelDiningInfo = this.state.hotelData.amenities[0].listItems[1].listItems;
    const hotelDiningServices = hotelDiningInfo.map((diningService, idx) => {
      return (
        <p key={idx} className="">{`${diningService}`}</p>
      );
    });

    const averagePrice = this.state.hotelData.propertyDescription.featuredPrice.currentPrice.formatted;
    const address = this.state.hotelData.propertyDescription.address.addressLine1 + ', ' + this.state.hotelData.propertyDescription.address.cityName + ', ' + this.state.hotelData.propertyDescription.address.countryName;

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
      <div className="vh-75 text-center">
        HOTEL DETAILS PAGE
        <div className="">
          <div className="big-container text-center vh-20 d-flex flex-column align-items-center">
            <p>{hotelName}</p>
            <button onClick={this.handleFavorites} className="fav-button"><p className="pt-2 pr-2 fav-img">{this.state.favorited ? '✓' : 'fav'}</p></button>
            <p className={this.state.favorited ? 'text-muted' : 'd-none'}>added to favorites</p>

            <p>{`Average User Rating:${badge} ${rating}/10`}</p>
            <p>Average Price: {averagePrice}</p>
            <p style={{ color: 'red' }}>{address}</p>
          </div>
          <div className="accordion" id="accordionExample">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Hotel Fact Sheet
                  </button>
                </h2>
              </div>
              <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div className="card-body">
                  {aboutList}
                  {hotelSize}
                  <span style={{ color: 'red' }}>Room Types Available: </span>
                  <span>{hotelRoomTypes}</span>
               </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0">
                  <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Dining & Entertainment
                  </button>
                </h2>
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div className="card-body">
                  {hotelDiningServices}
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingThree">
                <h2 className="mb-0">
                  <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Amenities
                 </button>
                </h2>
              </div>
              <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                <div className="card-body">
                  <span style={{ color: 'red' }}>In the Hotel: </span>
                  {amenityListHotel}
                  <span style={{ color: 'red' }}>In the Room: </span>
                  {amenityList}
               </div>
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
