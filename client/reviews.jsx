import React from 'react';
import Loader from './loader'
import NavBar from './navBar';

export default class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: '',
      isLoading: ''
    };
  }

  componentDidMount() {
    this.setState({isLoading: true})
    fetch(`/api/reviews/${this.props.hotelId}`)
      .then(response => {
        return response.json();
      })
      .then(reviews => {
        this.setState({ reviews: reviews, isLoading: false })
      })
      .catch(err => {
        console.error(err);
      });

  }

  render() {
    if (this.state.isLoading) return <Loader />
    if (this.state.reviews !== '') {
      const reviews = this.state.reviews.map((review, idx) => {
        if (review.recommendedBy !== '' && review.summary) {
          const dateObj = new Date(Number(review.postedOn))
          const month = dateObj.getUTCMonth() + 1;
          const day = dateObj.getUTCDate();
          const year = dateObj.getFullYear();
          const newDate = month + "/" + day + "/" + year;
          return (
            <div className="text-center card shadow-sm row-cols-md-1 p-3 col-12  mb-5  results-container p-3" key={idx + 1}>
              <h3 className="p-2" key={idx}>{`${review.recommendedBy} rated: ${review.qualitativeBadgeText}`}</h3>
              <p>{newDate}</p>
              <p key={idx - 1}>{review.summary}</p>
            </div>
          )
        }
      })
      return (
        <div>
          <div className="card shadow-lg row-cols-md-1 p-3 col-12  mb-5  results-container p-3">
            <h2 style={{ color: 'green' }} className="p-3 text-center ">{this.props.hotelName + ' Reviews'}</h2>
            {reviews}
            <NavBar />
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}
