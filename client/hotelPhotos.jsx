
import React from 'react';
import NavBar from './navBar';
import Loader from './loader';
import fetch from 'node-fetch';

export default class HotelDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: '',
      favorited: false,
      data: ''
    };

  }


  componentDidMount() {
    // this.setState({ isLoading: true });
    fetch(`/api/hotels/${this.props.hotelId}/photos`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('photo data', data)
        this.setState({data: data})
        console.log('state', this.state.data)
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.isLoading) return <Loader />;
    console.log(this.state)
    if (this.state.data) {
      return (
        <div>
          <p className="text-center">{this.props.hotelName}'s Photos</p>
          <img src={this.state.data.hotelImages[0].baseUrl}></img>
          <NavBar />
        </div>
      );
    }
    return <p>hi</p>
  }
}
