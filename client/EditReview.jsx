import React from 'react';
import NavBar from './navBar';
import Loader from './loader'

export default class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true


    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCleanlinessRating = this.handleCleanlinessRating.bind(this)
    this.handleServiceRating = this.handleServiceRating.bind(this)
    this.handleFoodEntertainmentRating = this.handleFoodEntertainmentRating.bind(this)
    this.handleUserTextReview = this.handleUserTextReview.bind(this)
    this.handleValues = this.handleValues.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    const currentDay = new Date(),
      dd = String(currentDay.getDate()).padStart(2, '0'),
      mm = String(currentDay.getMonth() + 1).padStart(2, '0'),
      yyyy = currentDay.getFullYear();

    const today = mm + '/' + dd + '/' + yyyy;

    function dateToTime(date) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const amOrPm = hours >= 12 ? 'P.M.' : 'A.M.'; //12AM will be 0 hours based on 24hr time, which still equals A.M
      hours = hours % 12; // any hour from 0-24 % 12 will give an truthy positive integer except for 12PM since 12%12 = 0 no remainder
      hours = hours ? hours : 12; //if current hours is truthy (NOT 12pm), it will keep the hour, if not then its 12PM
      minutes = minutes < 10 ? '0' + minutes : minutes; //this puts a 0 before any minutes less than 10, such as the 0 in 12:05PM, the 0 must be a string in order for type coercion to work
      const finalCurrentTime = hours + ':' + minutes + ' ' + amOrPm;
      return finalCurrentTime;
    }
    const getTimeFromDate = dateToTime(new Date)


    fetch(`/api/1/myreviews/edit/${this.props.reviewId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "newCleanlinessRating": !this.state.editedCleanliness ? this.state.currentHotelReviewData.cleanliness : this.state.cleanlinessRating,
        "newServiceRating": !this.state.editedService ? this.state.currentHotelReviewData.service : this.state.serviceRating,
        "newFoodAndEntertainment": !this.state.editedFoodAndEntertainment ? this.state.currentHotelReviewData.foodAndEntertainment : this.state.foodAndEntertainmentRating,
        "updatedContent": !this.state.editedTextContent ? this.state.currentHotelReviewData.content : this.state.userTextReview,
        "dateUpdated": today,
        "timeUpdated": getTimeFromDate,
        "hotelName": this.props.hotelName,
        "hotelId": this.props.hotelId,
        "reviewId": this.props.reviewId

      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ reviewSubmitted: true })
        location.hash = 'see-reviews'
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  handleCleanlinessRating(e) {

    this.setState({ cleanlinessRating: e.target.value, editedCleanliness: true });


  }
  handleServiceRating(e) {
    this.setState({ serviceRating: e.target.value, editedService: true });
  }
  handleFoodEntertainmentRating(e) {
    this.setState({ foodAndEntertainmentRating: e.target.value, editedFoodAndEntertainment: true });
  }
  handleUserTextReview(e) {
    this.setState({ userTextReview: e.target.value, editedTextContent: true });

  }

  handleValues(e) {

  }

  componentDidMount() {
    fetch(`/api/1/myreviews`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        data.map(val => {
          if (val.reviewId === Number(this.props.reviewId)) {
            val.reviewId = val.reviewId.toString()
            this.setState({ currentHotelReviewData: val, isLoading: false })
          }
        })
      })
      .catch(err => {
        console.error(err);
      });
  }


  render() {
    console.log(this.state)
    if (this.state.isLoading) return <Loader />

    return (
      <div>

        <form onSubmit={this.handleSubmit} className={this.state.reviewSubmitted ? 'd-none' : 'p-4 card shadow-lg m-4 review-div'}>
          <div className="text-center d-flex justify-content-center"> {<p className="text-danger pr-2"><span className="text-dark">Edit your </span> {this.props.hotelName}</p>}Review </div>
          <div className="form-group">
            <label >Cleanliness Rating</label>
            <select required onChange={this.handleCleanlinessRating} className="form-control" id="exampleFormControlSelect1">
              <option value={this.state.currentHotelReviewData.cleanliness} defaultValue>{this.state.currentHotelReviewData.cleanliness} (current rating)</option>
              <option value="5">5-Star</option>
              <option value="4">4-Star</option>
              <option value="3">3-Star</option>
              <option value="2">2-Star</option>
              <option value="1">1-Star</option>
            </select>
          </div>
          <div className="form-group">
            <label >Service Rating</label>
            <select required  onChange={this.handleServiceRating} className="form-control" id="exampleFormControlSelect2">
              <option value={this.state.currentHotelReviewData.service} defaultValue>{this.state.currentHotelReviewData.service} (current rating)</option>
              <option value="5">5-Star</option>
              <option value="4">4-Star</option>
              <option value="3">3-Star</option>
              <option value="2">2-Star</option>
              <option value="1">1-Star</option>
            </select>
          </div>
          <div className="form-group">
            <label >Food & Entertainment Rating</label>
            <select required  onChange={this.handleFoodEntertainmentRating} className="form-control" id="exampleFormControlSelect3">
              <option value={this.state.currentHotelReviewData.foodAndEntertainment} defaultValue>{this.state.currentHotelReviewData.foodAndEntertainment} (current rating)</option>
              <option value="5">5-Star</option>
              <option value="4">4-Star</option>
              <option value="3">3-Star</option>
              <option value="2">2-Star</option>
              <option value="1">1-Star</option>
            </select>
          </div>

          <div className="form-group">
            <label >Review</label>
            <textarea onChange={this.handleUserTextReview} defaultValue={this.state.currentHotelReviewData.content} required className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary mt-2">Save Changes</button>
            </div>
          </div>
        </form>
        <NavBar />
      </div>
    );
  }
}
