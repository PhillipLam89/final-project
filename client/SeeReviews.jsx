import React from 'react';
import Loader from './loader'

export default class SeeReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allHotelsReviewed: '',
      isLoading : true
    };
    this.handleSeeFullReview = this.handleSeeFullReview.bind(this)
  }

  componentDidMount() {

    fetch(`/api/1/myreviews/${this.props.hotelName}`)
      .then(response => {
        return response.json();
      })
      .then(data => {

          this.setState({allHotelsReviewed : data, isLoading: false})

      })
      .catch(err => {
        console.error(err);
      });
  }

  handleSeeFullReview(e) {
    this.state.allHotelsReviewed.map((val, index) => {
      if (Number(val.hotelId) === Number(e.target.dataset.id)) {
        this.setState({ chosenReviewId: Number(val.hotelId), chosenHotelName: val.hotelName, chosenContent: val.content, cleanliness: val.cleanliness, foodAndEntertainment: val.foodAndEntertainment, service: val.service })
      }
    })
  }

  render() {
      if (this.state.isLoading) return <Loader />

       const reviews = this.state.allHotelsReviewed.map((reviewedHotel, index) => {
         return (
           <div data-id={reviewedHotel.hotelId} data-name={reviewedHotel.hotelName} key={index + 1} onClick={this.handleSeeFullReview} data-toggle="modal" data-target="#exampleModal" className=" p-3  d-flex justify-content-center hotel-info-container review">
              <div data-id={reviewedHotel.hotelId} data-name={reviewedHotel.hotelName} key={index + 2} className="card shadow-lg book review">
                 <div data-id={reviewedHotel.hotelId} data-name={reviewedHotel.hotelName} key={index + 3} className="card-body review">
                   <a data-id={reviewedHotel.hotelId} data-name={reviewedHotel.hotelName} key={index + 4}><div data-id={reviewedHotel.hotelId} onClick={this.handleSeeFullReview} className="hotel-name text-white h6 review">{reviewedHotel.hotelName}</div></a>
                   <p data-id={reviewedHotel.hotelId} data-name={reviewedHotel.hotelName} key={index + 5} className="card-text d-flex justify-content-between pt-2 review">
                   <small data-id={reviewedHotel.hotelId} className="text-primary" key={index  + 6}>Written on {reviewedHotel.dateWritten}</small>
                   <small data-id={reviewedHotel.hotelId} key={index + 7}> {reviewedHotel.timeWritten}</small>
                   </p>
                 </div>
              </div>
            </div>
         );
       });


    return (
      <div className=" card shadow-lg m-4">
        <h2 className="text-center pt-2">Your Hotel Reviews</h2>
        <div className="results-container d-flex justify-content-center rounded">
          <div className="row row-cols-2 row-cols-md-2  mb-5 d-flex justify-content-center results-container p-3">
            {reviews}
          </div>
        </div>


        <div className="modal fade " id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog d-flex justify-content-center " role="document">
            <div className="modal-content modal-div ">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{'Your ' + this.state.chosenHotelName +' Review'}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <p className="p-3">Your Cleanliness Rating: {this.state.cleanliness}/5</p>
              <p className="p-3">Your Service Rating: {this.state.service}/5</p>
              <p className="p-3">Your Food & Entertainment Rating: {this.state.foodAndEntertainment}/5</p>
              <p className="pt-3 pl-3 mb-0 pb-0 font-weight-bold">Your Overall Review:</p>
              <p className="p-3">{this.state.chosenContent}</p>
              <div className="modal-body modal-div d-flex flex-column justify-content-end">
                <div className="w-100 d-flex justify-content-end"><button type="button" className="m-0  mt-3 btn btn-secondary" data-dismiss="modal">Close</button></div>
              </div>
            </div>
          </div>


        </div>
      </div>
    )
  }
}
