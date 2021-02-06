import React from 'react';
import NavBar from './navBar';

export default class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewSubmitted: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCleanlinessRating = this.handleCleanlinessRating.bind(this)
    this.handleServiceRating = this.handleServiceRating.bind(this)
    this.handleFoodEntertainmentRating = this.handleFoodEntertainmentRating.bind(this)
    this.handleUserTextReview = this.handleUserTextReview.bind(this)
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


    fetch(`/api/write/review/1/${this.props.hotelName}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "cleanliness": this.state.cleanlinessRating,
        "service": this.state.serviceRating,
        "foodAndEntertainment": this.state.foodAndEntertainmentRating,
        "content": this.state.userInput,
        "dateWritten": today,
        "timeWritten": getTimeFromDate,
        "hotelName": this.props.hotelName,
        "hotelId": this.props.hotelId
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({reviewSubmitted : true})
        location.hash = 'see-reviews'
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  handleCleanlinessRating(e) {
      this.setState({ cleanlinessRating: e.target.value });
  }
  handleServiceRating(e) {
    this.setState({ serviceRating: e.target.value });
  }
  handleFoodEntertainmentRating(e) {
    this.setState({ foodAndEntertainmentRating: e.target.value });
  }
  handleUserTextReview(e) {
    this.setState({ userInput: e.target.value });
  }
  render() {
    return (

      <div>
        <p className={this.state.reviewSubmitted ? ' fade-out text-center' : 'text-center'}>Your review has been added</p>
        <form onSubmit={this.handleSubmit} className={this.state.reviewSubmitted ? 'd-none' : 'p-4 card shadow-lg m-4 review-div'}>
          <div className="text-center d-flex justify-content-center"> {<p className="text-danger pr-2">{this.props.hotelName}</p>}Review </div>
          <div className="form-group">
            <label >Cleanliness Rating</label>
            <select required  value={this.statehandleCleanlinessRating} onChange={this.handleCleanlinessRating} className="form-control" id="exampleFormControlSelect1">
              <option value="" defaultValue>Select Rating</option>
              <option value="5">5-Star</option>
              <option value="4">4-Star</option>
              <option value="3">3-Star</option>
              <option value="2">2-Star</option>
              <option value="1">1-Star</option>
              </select>
            </div>
            <div className="form-group">
              <label >Service Rating</label>
              <select required value={this.state.handleServiceRating} onChange={this.handleServiceRating} className="form-control" id="exampleFormControlSelect2">
              <option value="" defaultValue>Select Rating</option>
              <option value="5">5-Star</option>
              <option value="4">4-Star</option>
              <option value="3">3-Star</option>
              <option value="2">2-Star</option>
              <option value="1">1-Star</option>
              </select>
            </div>
          <div className="form-group">
            <label >Food & Entertainment Rating</label>
            <select required  value={this.state.handleFoodEntertainmentRating} onChange={this.handleFoodEntertainmentRating} className="form-control" id="exampleFormControlSelect3">
              <option value="" defaultValue>Select Rating</option>
              <option value="5">5-Star</option>
              <option value="4">4-Star</option>
              <option value="3">3-Star</option>
              <option value="2">2-Star</option>
              <option value="1">1-Star</option>
            </select>
          </div>

          <div className="form-group">
            <label >Review</label>
            <textarea value={this.state.handleUserTextReview} required onChange={this.handleUserTextReview} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </div>
          </div>
        </form>
        <NavBar />
      </div>
    );
  }
}
