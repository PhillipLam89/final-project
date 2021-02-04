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
        "content": this.state.userInput
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({reviewSubmitted : true})
        const params = new URLSearchParams();
        params.append('hotelName', this.props.hotelName);
        location.hash = 'see-reviews?' + params;
      })
      .catch(error => {
        console.error('Error:', error);
      });

    // setTimeout(function () {

    // }, 2000);

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
