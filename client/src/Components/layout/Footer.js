import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer bg-dark" style={{position: 'fixed'}}>
        <div className="container">
          <span className="text-muted">
            Copyright &copy; {new Date().getFullYear()} Bidding System
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
