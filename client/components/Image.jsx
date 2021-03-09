import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from '../styles/useStyles';

export const Image = ({ image, alt }) => {
  const classes = useStyles();
  if (!image) return null;
  return <img className={classes.image} alt={alt} src={image} />;
};

Image.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string,
};
