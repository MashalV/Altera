import React from 'react';
import './Spinner.scss'; // You can style the spinner as needed

const Spinner = () => {
  return (
    <div className="spinner">
      {/* You can use CSS animations or a library for the spinner */}
      <div className="spinner-circle"></div>
    </div>
  );
};

export default Spinner;