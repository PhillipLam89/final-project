
import React from 'react';

class HotelDetails extends React.Component {

  render() {
    const hotelList = this.props.data.hotelList;
    let selectedIndex = null;
    for (let i = 0; i < hotelList.length; i++) {
      if (hotelList[i].name === this.props.data.selectedHotel) {
        selectedIndex = i;
        break;
      }
    }
    return (
      <div className="vh-75">
        <div className="big-container text-center vh-20 d-flex flex-column align-items-center">
          <img className="hotel-img selected-hotel" src={hotelList[selectedIndex].thumbnailUrl}></img>
          <p>{this.props.data.selectedHotel}</p>
          <p>Average User Rating: {hotelList[selectedIndex].guestReviews.badgeText} {hotelList[selectedIndex].guestReviews.rating}/10 </p>
        </div>
        <div className="">
          <div className=" accordion " id="accordionExample">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    About Us
                  </button>
                </h2>
              </div>
                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div className="card-body">
                  Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test
                </div>
              </div>
            </div>
              <div className="card">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0">
                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Amenities
                  </button>
                </h2>
              </div>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div className="card-body">
                  Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test
              </div>
              </div>
            </div>
              <div className="card">
               <div className="card-header" id="headingThree">
                <h2 className="mb-0">
                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Policies
                  </button>
                </h2>
              </div>
                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                  <div className="card-body">
                  Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0">
                  <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Dining & Entertaint
                  </button>
                </h2>
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div className="card-body">
                  Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test
              </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0">
                  <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    See Reviews
                  </button>
                </h2>
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div className="card-body">
                  Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="filler">
        </div>
        <nav className="navbar vh-10 navbar-light bottom-nav-abs mb-0 pb-0 d-flex justify-content-space-around">
          <img src="./images/home.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
          <img src="./images/search.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
          <img src="./images/settings.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
          <img src="./images/red-heart.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
          <img src="./images/user.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
        </nav>
      </div>

    );
  }
}
export default HotelDetails;
