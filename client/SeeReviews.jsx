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
           <div key={index+1} className=" p-2  d-flex justify-content-center hotel-info-container ">
            <div className="">
               <div key={index + 2} className="card shadow-sm book">
                <div key={index + 3} className="card-body ">
                  <a key={index + 4}><div className="hotel-name text-white h5">{reviewedHotel.hotelName}</div></a>
                  <p key={index + 5} className="card-text d-flex justify-content-between pt-2">
                    <small className="text-primary" key={index  + 6}>written on {reviewedHotel.dateWritten}</small>
                    <small key={index + 7}> {reviewedHotel.timeWritten}</small>
                  </p>
                  </div>
                </div>
             </div>
            </div>
         );
       });


    return (
      <div className=" card shadow-lg m-4">
        <h2 className="text-center pt-2">Your Reviewed Hotels</h2>
        <div className="results-container d-flex justify-content-center rounded">
          <div className="row row-cols-2 row-cols-md-2  mb-5 d-flex justify-content-center results-container p-3">
            {reviews}
          </div>
        </div>
      >
      </div>
    )
  }
}
