import React from 'react';
import PropTypes from 'prop-types';

const Button = ({text, click}) => {
  return(
    <button onClick={click}>{text}</button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired
};

export default Button;
