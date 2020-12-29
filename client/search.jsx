
import fetch from 'node-fetch';
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
    this.handleBackClick = this.handleBackClick.bind(this);
    this.ratingFilter = this.ratingFilter.bind(this);
  }

  ratingFilter(event) {
    this.setState({ ratingFilter: event.target.value });
  }

  handleUserInput(event) {
    this.setState({ userInput: event.target.value });
  }

  handleBackClick() {
    this.setState({ userInput: '', hotelList: [], searchButtonClicked: '', isLoading: false, userInputError: false });
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
    this.setState({ isLoading: true });
    fetch(`/api/search/${arr}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const cityId = data.suggestions[0].entities[0].destinationId;
        fetch(`/api/search/list/${cityId}/${this.state.ratingFilter}`).then(response => response.json()).then(data => {
          const hotelList = data.data.body.searchResults.results;
          this.setState({ userInput: this.state.userInput, hotelList: hotelList, searchButtonClicked: 'hidden', isLoading: false, ratingFilter: this.state.ratingFilter });
        })
          .catch(err => console.error(err));
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.isLoading) return <Loader />;
    const { hotelList, userInput, searchButtonClicked, userInputError, ratingFilter } = this.state;
    const displayedList = hotelList.map((hotel, idx) => {
      return (
        <div className="hotel-display-div text-center d-flex flex-column justify-content-center align-items-center" key={hotel.supplierHotelId}>
          <p key={hotelList.id} className="hotel-name">{hotel.name}</p>
          <img key={hotel.thumbnailUrl} src={hotel.thumbnailUrl} className="hotel-img pb-2"></img>
        </div>
      );
    });
    return (
      <div>
        <div className={searchButtonClicked === '' ? 'd-none' : '' + ' arrow-div align-items-center pt-2 d-flex justify-content-start'}>
          <img onClick={this.handleBackClick} className="back-arrow " width="50rem" src="https://cdn0.iconfinder.com/data/icons/navigation-set-arrows-part-one/32/ChevronLeftCircle-512.png"></img>
          <p className="search-txt text-center pt-0.5 pl-1"> Back to Search Screen</p>
        </div>
        <main className={searchButtonClicked === '' ? 'd-none' : ''}>
          <div className="header text-center"><h3>{userInput.toUpperCase() + ` ${this.state.ratingFilter}-STAR HOTELS:`}</h3></div>
          <div className="hotel-list d-flex flex-column p-1.5">{displayedList}</div>
        </main>
        <div className={searchButtonClicked}>
          <img className="main-pic" src="https://cdn.cnn.com/cnnnext/dam/assets/190903131748-greek-luxury-seaside-hotels---grecotel-mykonos-blu---infinity-pool-1.jpg"></img>
          <header className={`${searchButtonClicked} text-center`}>
            <nav className={userInputError ? 'navbar navbar-light bg-light input-container error-border d-flex' : 'navbar navbar-light bg-light input-container'}>
              <form onSubmit={this.handleSearchClick} className={'form-inline'}>
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
            </nav>
          </header>
        </div>
        <NavBar />
      </div>
    );
  }
}
export default Search;
