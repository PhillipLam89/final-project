
import React from 'react';
import NavBar from './navBar';
import Loader from './loader';
import fetch from 'node-fetch';

export default class HotelPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: '',
      photosData: ''
    };

  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(`/api/hotels/${this.props.hotelId}/photos`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        data.hotelImages.length > 100 ? data.hotelImages.length = 100 : data.hotelImages.length
        this.setState({ photosData: data, isLoading: false})
        console.log(this.state.photosData)
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    if (this.state.isLoading) return <Loader />;
    else if (this.state.photosData) {

              //property photos
      const photos = this.state.photosData.hotelImages.map((photo, idx) => {
        const newPhotos = photo.baseUrl.replaceAll('_{size}', '')
        return (
          <img className="m-3 rounded shadow-lg rounded property-img" key={photo.imageId} width="170px" src={newPhotos}></img>
        );
      });

        //room photos
      let roomPhotosCollection = []
      this.state.photosData.roomImages.map((photo, idx) => {
        for (let i = 0; i < photo.images.length; i++ ) {
         const newUrl = photo.images[i].baseUrl.replaceAll('_{size}', '')
          roomPhotosCollection.push(newUrl)
        }
      });
      const roomPhotosAll = roomPhotosCollection.map((photo, idx) => {
        return (
          <img className="m-3 rounded shadow-lg rounded property-img" key={idx} width="170px" src={photo}></img>
        );
      });


      return (
        <div>
          <p className="text-center">{this.props.hotelName}'s Photos</p>
          <div className="photos-accordion-div">
            <div className="accordion photos-accordion" id="accordionExample">
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h2 className="mb-0 ">
                    <div className="btn  pl-0 text-dark " type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      <h4>Property Photos</h4>
                    </div>
                  </h2>
                </div>
                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div>
                    <div className="card-body  p-0 d-flex flex-column justify-content-between">
                      <div className="  m-0 p-0 d-flex justify-content-center flex-wrap photo-page-div rounded ">
                          {photos}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h2 className="mb-0 ">
                    <button className="btn collapsed pl-0 text-dark " type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      <h4>Room Photos</h4>
                    </button>
                  </h2>
                </div>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                  <div>
                    <div className="card-body  p-0 d-flex flex-column justify-content-between">
                      <div className="  m-0 p-0 d-flex justify-content-center flex-wrap photo-page-div rounded ">
                        {roomPhotosAll}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <NavBar />
        </div>
      );
    }
    return null
  }
}
