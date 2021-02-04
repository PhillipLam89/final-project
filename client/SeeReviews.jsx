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
           <p key={index} className="text-center">{reviewedHotel.hotelName}</p>
         );
       });


    return (
      <h3>{reviews}</h3>
    )
  }
}
