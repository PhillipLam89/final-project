import React from 'react';
import NavBar from '../navBar';
import Search from '../search';
export default class Home extends React.Component {
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
  }

  handleSearchClick() {
    this.setState({ searchButtonClicked: true });
  }

  componentDidMount() {
    location.hash = '';
  }

  render() {
    if (this.state.searchButtonClicked) return <Search/>;
    return (
      <>
        <main className="home vh-100 text-center">
          HOME PAGE
        </main>
        <NavBar />
      </>
    );
  }
}
