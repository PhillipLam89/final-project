import React from 'react';
export default class NavBar extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-light bottom-nav">
        <img src="https://www.flaticon.com/svg/static/icons/svg/25/25694.svg" width="30" height="30" className="d-inline-block align-top" alt=""></img>
        <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/searching-glass-2262729-1885655.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
        <img src="https://img2.pngio.com/settings-icon-of-flat-style-available-in-svg-png-eps-ai-settings-icon-png-256_256.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
        <img src="https://img.icons8.com/emoji/452/red-heart.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png" width="30" height="30" className="d-inline-block align-top" alt=""></img>
      </nav>
    );
  }
}
