import React from 'react';
import NavBar from './navBar';
import Loader from './loader'

export default class SeeReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allHotelsReviewed: '',
      isLoading : true
    };

  }

  // handleSubmit(e) {

  // }
  // handleUserTextReview(e) {

  // }

  componentDidMount() {

    fetch(`/api/1/myreviews/${this.props.hotelName}`)
      .then(response => {
        return response.json();
      })
      .then(data => {

          this.setState({allHotelsReviewed : data, isLoading: false})
          console.log('reviewed hotels', data)
      })
      .catch(err => {
        console.error(err);
      });
  }
  render() {
     console.log('state', this.state)
      if (this.state.isLoading) return <Loader />
       const reviews = this.state.allHotelsReviewed.map((reviewedHotel, index) => {
         return (

           <div key={index+1} className=" p-3 card-deck card-img-top d-flex justify-content-center hotel-info-container">
             <div key={index+2} className="card shadow-sm">
               <div key={index + 3} className="card-body">
                 <a key={index + 4}><div className="hotel-name">{reviewedHotel.hotelName}</div></a>
                 <p key={index + 5} className="card-text d-flex justify-content-between">
                   <small key={index  + 6}>written on 2/24/21</small>
                </p>
                </div>
              </div>
            </div>
         );
       });


    return (
      <div className="results-container d-flex justify-content-center rounded">
        <div className="row row-cols-2 row-cols-md-2  mb-5 d-flex justify-content-center results-container p-3 ">
          {reviews}
        </div>
      </div>
    )
  }
}
