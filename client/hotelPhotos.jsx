
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
      photosData: ''
    };

  }


  componentDidMount() {
    // this.setState({ isLoading: true });
    fetch(`/api/hotels/${this.props.hotelId}/photos`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        data.hotelImages.length > 50 ? data.hotelImages.length = 50 : data.hotelImages.length
        this.setState({ photosData: data})

      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.isLoading) return <Loader />;
    else if (this.state.photosData) {
      const photos = this.state.photosData.hotelImages.map((photo, idx) => {
        const newPhotos = photo.baseUrl.replaceAll('_{size}', '')
        return (
          <img className="m-3 card shadow-lg" key={photo.imageId} width="170px" src={newPhotos}></img>
        );
      });
      return (
        <div>
          <p className="text-center">{this.props.hotelName}'s Photos</p>
          <div className="p-3 d-flex justify-content-center flex-wrap">
           {photos}
          </div>
          <NavBar />
        </div>
      );
    }
    return <p>hi</p>
  }
}
