import React from 'react';
import Loader from './loader'
export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      username: '',
      password: '',
      isLoading: false,
      accountMade: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name
    const value = e.target.value

    // [name] evaluates to to string
    this.setState({ [name]: value });

  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true })
    fetch('/api/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(data => {
      if (data.status === 201) {
        this.setState({ isLoading: false, accountMade: true })
        setTimeout(function(){
            location.hash = 'login'   //renders home page after successfully creation
        },2000)
      }
    })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    if (this.state.isLoading) return <Loader />
    return (

      <main className="registration-container  text-center vh-100">
        <h2  className={this.state.accountMade ? 'd-none' : ''}>Create an Account</h2>
        <h2 style={{ color: 'green' }} className={this.state.accountMade ? 'fade1' : 'd-none'}>Account Created Successfully!</h2>
        <div className={this.state.accountMade ? 'd-none' : 'd-flex flex-column align-items-center pt-3'}>
          <form className="d-flex flex-column align-items-center pt-3" onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input required id="name" type="text" name="fullName" onChange={this.handleChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input required id="username" type="text" name="username" onChange={this.handleChange} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input required id="password" type="password" name="password" onChange={this.handleChange} className="form-control" />
            </div>
            <div>
              <button className="btn dark-blue bg-light border border-primary" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }
}
