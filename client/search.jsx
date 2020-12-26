import React from 'react';
import Loader from './loader';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      hotelList: [],
      searchButtonClicked: '',
      hotelThumbnails: [],
      isLoading: false,
      userInputError: false
    };
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
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
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (let i = 0; i < numbers.length; i++) {
      if (arr[0] === '' || arr[0].includes(numbers[i])) {
        this.setState({ userInputError: true });
        return;
      }
    }
    if (arr[1] === undefined) arr[1] = '';
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
        fetch(`https://hotels4.p.rapidapi.com/properties/list?destinationId=${cityId}&pageNumber=1&checkIn=2020-02-08&checkOut=2020-02-15&pageSize=25&adults1=1&currency=USD&starRatings=5&locale=en_US&sortOrder=PRICE&guestRatingMin=8`, {
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
            this.setState({ userInput: this.state.userInput, hotelList: this.state.hotelList, searchButtonClicked: 'hidden', hotelThumbnails: this.state.hotelThumbnails, isLoading: false, userInputError: false });
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
          <div className="header"><h1>{userInput.toUpperCase() + ' 5 STAR HOTELS:'}</h1></div>
          <div className="hotel-list">{displayedList}</div>
        </main>
        <div className={searchButtonClicked}>
            <img className="main-pic" src="https://www.buro247.sg/thumb/950x700/local/images/buro/galleries/2018/07/ritz-carlton-langkawi-horizon-infinity-pool-buro247.sg-A8.jpg"></img>
          <header className={searchButtonClicked}>
            <h6>{userInputError ? <p style={{ color: 'red' }}>INVALID CITY</p> : 'Only the top 5-Star Resorts will be displayed'}</h6>
            <nav className="navbar navbar-light bg-light">
              <form onSubmit={this.handleSearchClick} className="form-inline">
                <input value={userInput} onChange={this.handleUserInput} className="form-control mr-sm-2" type="search" placeholder="city (worldwide)" aria-label="Search"></input>
                <button className="search-btn btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </nav>
          </header>
        </div>
        <nav className="navbar navbar-light bottom-nav">
          <img src="https://www.flaticon.com/svg/static/icons/svg/25/25694.svg" width="30" height="30" className="d-inline-block align-top" alt=""></img>
          <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/searching-glass-2262729-1885655.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
          <img src="https://img2.pngio.com/settings-icon-of-flat-style-available-in-svg-png-eps-ai-settings-icon-png-256_256.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
        </nav>
      </div>
    );
  }
}
export default Search;
