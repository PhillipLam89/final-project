import React from 'react';

export default class LogIn extends React.Component {

  render() {
    return (
      <main className="vh-100 registration-container">
        <h3 className="pb-3 text-center blue pt-4">Sign In</h3>
        <div className="state-form d-flex justify-content-center">
          <form className="d-flex flex-column align-items-center pt-3">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input required id="username" type="text" name="username" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input required id="password" type="password" name="password" className="form-control" />
            </div>
            <div>
              <button className="btn dark-blue  border border-primary " type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }
}
