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
      hotelThumbnails: [],
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
    this.setState({ userInput: '', hotelList: [], searchButtonClicked: '', hotelThumbnails: [], isLoading: false, userInputError: false });
  }

  handleSearchClick(event) {

    event.preventDefault();
    const arr = this.state.userInput.split(' ');
    const notAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '`', '!', '#', '$', '%', '^', '&', '-', '_',
      '*', '(', ')', '+', '=', '<', '>', ',', '.', '?', ':', ';', '@', '{', '}', '[', ']', '~', '/'];

    for (let i = 0; i < notAllowed.length; i++) {
      if (arr[0] === '' || arr[0].includes(notAllowed[i])) {
        return this.setState({ userInputError: true });
      }
      if (arr[1] === undefined) arr[1] = '';
      else if (arr[1] && arr[1].includes(notAllowed[i])) {
        return this.setState({ userInputError: true });
      }
    }

    this.setState({ isLoading: true });
    fetch(`https://hotels4.p.rapidapi.com/locations/search?query=${arr[0]}%20${arr[1]}&locale=en_US`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'aee2d76ddemshdce25e084382256p16705fjsncaa046304cdd',
        'x-rapidapi-host': 'hotels4.p.rapidapi.com'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const cityId = data.suggestions[0].entities[0].destinationId;
        fetch(`https://hotels4.p.rapidapi.com/properties/list?destinationId=${cityId}&pageNumber=1&checkIn=2020-02-08&checkOut=2020-02-15&pageSize=25&adults1=1&currency=USD&starRatings=${this.state.ratingFilter}&locale=en_US&sortOrder=PRICE&guestRatingMin=8`, {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'aee2d76ddemshdce25e084382256p16705fjsncaa046304cdd',
            'x-rapidapi-host': 'hotels4.p.rapidapi.com'
          }
        })
          .then(response => {
            return response.json();
          })
          .then(data => {
            const hotelList = data.data.body.searchResults.results;
            for (const hotel of hotelList) {
              this.state.hotelList.push(hotel.name);
              this.state.hotelThumbnails.push(hotel.thumbnailUrl);
            }
            this.setState({ userInput: this.state.userInput, hotelList: this.state.hotelList, searchButtonClicked: 'hidden', hotelThumbnails: this.state.hotelThumbnails, isLoading: false, ratingFilter: this.state.ratingFilter });
          })
          .catch(err => console.error(err));
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.isLoading) return <Loader />;
    const { hotelList, userInput, hotelThumbnails, searchButtonClicked, userInputError } = this.state;
    const displayedList = hotelList.map((hotelName, idx) => {
      return (
        <div key={idx + 1} className="hotel-display-div">
          <p key={idx} className="hotel-name">{hotelName}</p>
          <img key={idx + hotelName} src={hotelThumbnails[idx]} className="hotel-img"></img>
        </div>
      );
    });
    return (
      <div>
        <div className={searchButtonClicked === '' ? 'hidden' : '' + ' arrow-div'}>
          <img onClick={this.handleBackClick} className="back-arrow" width="50rem" src="https://cdn0.iconfinder.com/data/icons/navigation-set-arrows-part-one/32/ChevronLeftCircle-512.png"></img>
          <p className="search-txt"> Back to Search Screen</p>
        </div>
        <main className={searchButtonClicked === '' ? 'hidden' : ''}>
          <div className="header"><h3>{userInput.toUpperCase() + ` ${this.state.ratingFilter}-STAR HOTELS:`}</h3></div>
          <div className="hotel-list">{displayedList}</div>
        </main>
        <div className={searchButtonClicked}>
          <img className="main-pic" src="https://cdn.cnn.com/cnnnext/dam/assets/190903131748-greek-luxury-seaside-hotels---grecotel-mykonos-blu---infinity-pool-1.jpg"></img>
          <header className={searchButtonClicked}>
            <nav className={userInputError ? 'navbar navbar-light bg-light input-container error-border' : 'navbar navbar-light bg-light input-container'}>
              <form onSubmit={this.handleSearchClick} className="form-inline">
                <input value={userInput} onChange={this.handleUserInput} className="form-control mr-sm-2" type="search" placeholder="city (worldwide)" aria-label="Search"></input>
                <div className="form-row align-items-center preference-div">
                  <div className="col-auto my-1">
                    <select value={this.state.ratingFilter} onChange={this.ratingFilter} className="custom-select mr-sm-2" id="inlineFormCustomSelect">
                      <option value="default" defaultValue>Filter By Rating</option>
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
                <h6>{userInputError ? <p className="user-error">INVALID CITY</p> : ''}</h6>
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
