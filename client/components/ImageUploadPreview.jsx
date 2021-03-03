import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

const useStyles = () => {
  const styles = makeStyles((theme) => ({
    container: {
      backgroundColor: theme.palette.background.greyLight,
      height: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      '&:hover': {
        cursor: 'pointer',
      },
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
  }));

  return styles();
};

export const ImageUploadPreview = ({ image, setImage }) => {
  const [imageDisplay, setImageDisplay] = useState();
  const styles = useStyles();
  const file = useRef(null);

  useEffect(() => {
    if (!image || !(image instanceof Blob)) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageDisplay(e.target.result);
    };
    reader.readAsDataURL(image);
  }, [image]);

  const setImageFunc = useCallback(
    (e) => {
      e.preventDefault();
      setImage(e.target.files[0]);
    },
    [setImage],
  );

  const renderImage = () => {
    return <img src={imageDisplay} className={styles.image} alt="Quiz Preview" />;
  };

  const renderIcon = () => {
    return (
      <Box className={styles.iconContainer}>
        <AddAPhotoIcon fontSize="large" />
        <Typography>Upload Image</Typography>
      </Box>
    );
  };

  return (
    <Box className={styles.container} onClick={() => file.current.click()}>
      {imageDisplay ? renderImage() : renderIcon()}
      <input type="file" accept="image/*" ref={file} hidden onChange={setImageFunc} />
    </Box>
  );
};

ImageUploadPreview.propTypes = {
  image: PropTypes.object.isRequired,
  setImage: PropTypes.func.isRequired,
};
