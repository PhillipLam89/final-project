import React from 'react';
import NavBar from './navBar'

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      loggedUser: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(data => {
        if (data.userName.userName) {
          this.setState({ loggedUser: data.userName.userName })
          const params = new URLSearchParams();
          params.append('currentUser', this.state.loggedUser);

          setTimeout(function () {
            location.hash = 'logged?' + params;   //renders home page after successful login
          }, 2000)
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    return (
      <main className="vh-100 registration-container">
        <h3 className={this.state.loggedUser ? 'fade1 pb-3 text-center blue pt-4' : 'pb-3 text-center blue pt-4'}>{this.state.loggedUser ? `Logged in as ${this.state.loggedUser}` : `Log In`}</h3>
        <div className="state-form d-flex justify-content-center">
          <form className={this.state.loggedUser ? 'd-none' : 'd-flex flex-column align-items-center pt-3'} onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input onChange={this.handleChange} required id="username" type="text" name="userName" className="form-control"  />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input onChange={this.handleChange} required id="password" type="password" name="password" className="form-control" />
            </div>
            <div>
              <button className="btn dark-blue  border border-primary " type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
        <NavBar />
      </main>
    );
  }
}
