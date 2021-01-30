
import React from 'react';
import Loader from './loader';
import NavBar from './navBar';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      hotelList: [],
      searchButtonClicked: '',
      ratingFilter: '',
      isLoading: false,
      userInputError: false
    };
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.ratingFilter = this.ratingFilter.bind(this);
    this.handleGeolocation = this.handleGeolocation.bind(this)
  }

  ratingFilter(event) {
    this.setState({ ratingFilter: event.target.value });
  }

  handleUserInput(event) {
    this.setState({ userInput: event.target.value });
  }

  handleSearchClick(event) {
    event.preventDefault();
    if (!this.state.ratingFilter) {
      return this.setState({ userInputError: true });
    }
    const arr = this.state.userInput;
    const notAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '`', '!', '#', '$', '%', '^', '&', '-', '_',
      '*', '(', ')', '+', '=', '<', '>', ',', '.', '?', ':', ';', '@', '{', '}', '[', ']', '~', '/'];

    for (let i = 0; i < notAllowed.length; i++) {
      if (arr === '' || arr.includes(notAllowed[i])) {
        return this.setState({ userInputError: true });
      }
    }

    const params = new URLSearchParams();
    params.append('cityName', this.state.userInput);
    params.append('ratingFilter', this.state.ratingFilter);
    location.hash = 'search-results?' + params;

  }

  handleGeolocation(e) {

    window.navigator.geolocation.getCurrentPosition(
      (position) => {

        const {latitude, longitude} = position.coords
        console.log(latitude, longitude)


      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=AIzaSyA7DmLK1L-rsNHd8VRmn6wrChvhX9ERau8`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log('geo data', data.results[0].formatted_address.split(','))
          const address = data.results[0].formatted_address.split(',')
          const city = address[1]
          const params = new URLSearchParams();
          params.append('cityName', city);
          params.append('ratingFilter', 3);
          location.hash = 'search-results?' + params;

          console.log('city', city)
        })
        .catch(err => {
          console.error(err);
        });



      },
      (err) => console.log(err)
    )

  }

  render() {
    if (this.state.isLoading) return <Loader />;

    const { userInput, userInputError, ratingFilter } = this.state;
    return (
      <div className="search-container min-vh-100">
        <form onSubmit={this.handleSearchClick} className="card p-4 search-form shadow-sm">
          <h3 className="text-center mb-3">Search Hotels</h3>
          <div className="form-group">
            <label htmlFor={userInput}>City</label>
            <input value={userInput} onChange={this.handleUserInput} className="form-control shadow-sm" type="text" aria-label="Search"></input>
          </div>
          <div className="form-group">
            <label htmlFor={ratingFilter}>Star Rating</label>
            <select value={ratingFilter} onChange={this.ratingFilter} className="form-control shadow-sm" id="inlineFormCustomSelect">
              <option value="" defaultValue></option>
              <option value="5">5-Star</option>
              <option value="4">4-Star</option>
              <option value="3">3-Star</option>
              <option value="2">2-Star</option>
              <option value="1">1-Star</option>
            </select>
          </div>
          {
            this.state.userInputError &&
            <h6 className="text-danger mb-4">
              {this.state.ratingFilter ? 'Invalid City' : 'Choose a rating and valid city'}
            </h6>
          }
          <div className="d-flex justify-content-around mt-4"><button type="submit" className="btn btn-dark shadow">Search</button></div>
        </form>
        <div className="mt-3 "><button className="rounded border border-warning " onClick={this.handleGeolocation}>Find nearest hotels</button></div>
      </div>
    );
  }
}
export default Search;
