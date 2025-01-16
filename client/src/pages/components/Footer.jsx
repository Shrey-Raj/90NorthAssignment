import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 quicksand-medium">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="#" className="text-decoration-none me-3 quicksand-regular">Privacy Policy</a>
            <a href="#" className="text-decoration-none quicksand-regular">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

