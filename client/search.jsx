
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

  render() {
    if (this.state.isLoading) return <Loader />;
    const { userInput, userInputError, ratingFilter } = this.state;
    return (
      <div className="search-container">
        <div>
          <img className="main-pic" src="https://cdn.cnn.com/cnnnext/dam/assets/190903131748-greek-luxury-seaside-hotels---grecotel-mykonos-blu---infinity-pool-1.jpg"></img>
          <header>
            <div>
              <form onSubmit={this.handleSearchClick} className={'form-inline bg-dark'}>
                <input value={userInput} onChange={this.handleUserInput} className="form-control mr-sm-2" type="search" placeholder="city (worldwide)" aria-label="Search"></input>
                <div className="form-row align-items-center preference-div pl-0.5">
                  <div className="col-auto my-1">
                    <select value={ratingFilter} onChange={this.ratingFilter} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                      <option value="" defaultValue>Filter By Rating</option>
                      <option value="5">5-Star</option>
                      <option value="4">4-Star</option>
                      <option value="3">3-Star</option>
                      <option value="2">2-Star</option>
                      <option value="1">1-Star</option>
                    </select>
                  </div>
                  <div className="col-auto my-1">
                  </div>
                </div>
                <button className="search-btn btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                <h6 className="user-error pl-0.5">{userInputError && !ratingFilter ? 'CHOOSE A RATING & VALID CITY' : ''}</h6>
                <h6>{userInputError && ratingFilter ? <p className="user-error">INVALID CITY</p> : ''}</h6>
              </form>
            </div>
          </header>
        </div>
        <NavBar />
      </div>
    );
  }
}
export default Search;
