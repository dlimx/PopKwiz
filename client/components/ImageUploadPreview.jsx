import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Typography } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ClearIcon from '@material-ui/icons/Clear';

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
    iconButton: {
      position: 'absolute',
      right: '20px',
      top: '20px;',
    },
    imageContainer: {
      position: 'relative',
      height: '300px',
      display: 'flex',
      width: '100%',
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

  const clearImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImage('');
    setImageDisplay('');
  };

  const renderImage = () => {
    return (
      <div className={styles.imageContainer}>
        <img src={imageDisplay} className={styles.image} alt="Quiz Preview" />
        <IconButton onClick={clearImage} style={{ backgroundColor: 'white' }} className={styles.iconButton}>
          <ClearIcon />
        </IconButton>
      </div>
    );
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
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  setImage: PropTypes.func.isRequired,
};
