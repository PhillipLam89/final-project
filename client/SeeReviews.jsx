import React from 'react';
import Loader from './loader'

export default class SeeReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allHotelsReviewed: '',
      isLoading : true,
      deletedItem: ''

    };
    this.handleSeeFullReview = this.handleSeeFullReview.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleEditReview = this.handleEditReview.bind(this)
  }

  componentDidMount() {

    fetch(`/api/1/myreviews/`)
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
    if (!e.target.className.includes('delete') && e.target.className !== 'edit-review')  {
      this.state.allHotelsReviewed.map(val => {
        if (Number(val.reviewId) === Number(e.target.dataset.id)) {
          this.setState({ chosenReviewId: Number(val.hotelId), chosenHotelName: val.hotelName, chosenContent: val.content, cleanliness: val.cleanliness, foodAndEntertainment: val.foodAndEntertainment, service: val.service })
        }
      })
    }
    else  {
      e.stopPropagation();
    }
  }

  handleEditReview(e) {

    this.state.allHotelsReviewed.map(val => {
      if (Number(val.reviewId) === Number(e.target.dataset.id)) {
        this.setState({ userWillEdit: true, chosenReviewId: Number(val.reviewId), chosenHotelId: Number(val.hotelId), chosenHotelName: val.hotelName, chosenContent: val.content, cleanliness: val.cleanliness, foodAndEntertainment: val.foodAndEntertainment, service: val.service })

      }
    })

  }

  handleRemove(e) {
    e.preventDefault()
    let removalId = ''
    const remainingReviews = this.state.allHotelsReviewed.filter(hotelObj => {
      if (Number(hotelObj.reviewId) === Number(e.target.dataset.id)) removalId = Number(hotelObj.reviewId)
      return Number(hotelObj.reviewId) !== Number(e.target.dataset.id)
    });
    fetch(`/api/1/reviews/remove/${removalId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(data => {
        this.setState({ allHotelsReviewed: remainingReviews})
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {

      if (this.state.isLoading) return <Loader />

       const reviews = this.state.allHotelsReviewed.map((reviewedHotel, index) => {
         return (
           <div data-id={reviewedHotel.reviewId}  key={index + 1} onClick={this.handleSeeFullReview} data-toggle="modal" data-target="#exampleModal" className=" p-3  d-flex justify-content-center hotel-info-container review">
             <div data-id={reviewedHotel.reviewId} key={index + 2} className="card shadow-lg book review">
                 <p data-id={reviewedHotel.reviewId} key={index + 8} onClick={this.handleRemove} className="delete font-weight-bold pt-1 mb-0 pb-0 mr-3  h3 text-right align-items-center" data-toggle="tooltip" data-placement="top" title="Delete Review">&times;</p>
                 <div data-id={reviewedHotel.reviewId}  key={index + 3} className="card-body review mt-0 pt-0">
                 <a data-id={reviewedHotel.reviewId} key={index + 4}><div data-id={reviewedHotel.reviewId} onClick={this.handleSeeFullReview} className="hotel-name text-white h6 review">{reviewedHotel.hotelName}</div></a>
                 <small data-id={reviewedHotel.reviewId} key={index + 6} className="text-white font-weight-bold" >Written on {reviewedHotel.dateWritten}</small>
                 <small data-id={reviewedHotel.reviewId} key={index + 7} className="font-weight-bold "> {reviewedHotel.timeWritten}</small><br></br>
                 <a onClick={this.handleEditReview}  data-id={reviewedHotel.reviewId}  className="edit-review">Edit Review</a>
                 </div>
              </div>
            </div>
         );
       });

      if (this.state.userWillEdit) {
        location.hash = `#edit-review?hotelName=${this.state.chosenHotelName}&hotelId=${this.state.chosenHotelId}&reviewId=${this.state.chosenReviewId}`
      }

    return (
      <div className=" card shadow-lg m-4 review-div ">
        <h2 className="text-center pt-2">Your Hotel Reviews</h2>
        <div className="results-container d-flex justify-content-center rounded">
          <div className="row row-cols-2 row-cols-md-2  mb-5 d-flex justify-content-center results-container p-3">
            {reviews}

          </div>
        </div>
        <div className="modal fade " id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog d-flex justify-content-center " role="document">
            <div className="modal-content modal-div-review ">
              <div className="modal-header border-0">
                <h5 className="modal-title" id="exampleModalLabel">{'Your ' + this.state.chosenHotelName +' Review'}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <p className="p-3">Your Cleanliness Rating: {this.state.cleanliness}/5</p>
              <p className="p-3">Your Service Rating: {this.state.service}/5</p>
              <p className="p-3">Your Food & Entertainment Rating: {this.state.foodAndEntertainment}/5</p>
              <p className="pt-3 pl-3 mb-0 pb-0 font-weight-bold">Your Overall Review:</p>
              <div className="p-3">{this.state.chosenContent}<div className="w-100 d-flex justify-content-end p-3"><button type="button" className="m-0  mt-3 btn btn-secondary" data-dismiss="modal">Close</button></div></div>
            </div>
          </div>


        </div>
      </div>
    )
  }
}
