import React from 'react';
import NavBar from './navBar';

export default class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewSubmitted: '2'
    };

  }

  render() {
    return (
      <div>
        <form className="p-4 card shadow-lg m-4 review-div">
          <div className="text-center d-flex justify-content-center"> {<p className="text-danger pr-2">{this.props.hotelName}</p>}Review </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Your Name</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="name"></input>
          </div>
          <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Cleanliness Rating</label>
            <select className="form-control" id="exampleFormControlSelect1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          <div className="form-group">
              <label htmlFor="exampleFormControlSelect2">Service Rating</label>
              <select className="form-control" id="exampleFormControlSelect2">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect3">Food & Entertainment Rating</label>
            <select className="form-control" id="exampleFormControlSelect3">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Review</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
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
