import React from 'react';
import NavBar from './navBar';

export default class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: ''
    };

  }

  handleSubmit(e) {

  }
  handleUserTextReview(e) {

  }

  componentDidMount() {
    this.setState({ mounted: true });
    fetch(`/api/1/myreviews/${this.props.hotelName}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
          console.log('see review data', data)
      })
      .catch(err => {
        console.error(err);
      });
  }
  render() {

    return (
      <div className="text-center">
          {this.state.mounted ? 'trueee' : 'state is false'}
      </div>
    );
  }
}
