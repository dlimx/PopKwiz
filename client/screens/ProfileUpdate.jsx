import React, { useState, useCallback } from 'react';
import { Button, Typography, Accordion, Container, AccordionDetails, Grid, TextField } from '@material-ui/core';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import { useAuth } from '../store/users/AuthContext';
import { ImageUploadPreview } from '../components/ImageUploadPreview';
import { useAPI } from '../api/api';
import { AlertMessage } from '../components/AlertMessage';

const AccordionSummary = withStyles({
  root: {
    flexDirection: 'column',
  },
  content: {
    marginBottom: 0,
  },
  expandIcon: {
    marginRight: 0,
    paddingTop: 0,
  },
})(MuiAccordionSummary);

export const ProfileUpdate = () => {
  const { updatePassword, updateEmail } = useAuth();
  const [status, setStatusBase] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [image, setImage] = useState(null);
  const api = useAPI();

  // update username
  const handleUserName = (value) => {
    setUsername(value);
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    localStorage.removeItem('username');
    localStorage.setItem('username', username);
    try {
      api.post('/users/username', { username }).then((res) => {
        console.log(res);
      });
      setStatusBase({ msg: 'Success: User has been updated', key: Math.random() });
    } catch (error) {
      localStorage.removeItem('username');
      setStatusBase({ msg: error, key: Math.random() });
    }
  };

  // update email
  const handleEmail = (value) => {
    setEmail(value);
  };

  const handleEmailUpdate = (e) => {
    e.preventDefault();
    localStorage.removeItem('email');
    localStorage.setItem('email', email);
    try {
      api.post('/users/email', { email }).then((res) => {
        console.log(res);
      });
      updateEmail(email);
      setStatusBase({ msg: 'Success: Email has been updated', key: Math.random() });
    } catch (error) {
      localStorage.removeItem('email');
      setStatusBase({ msg: error, key: Math.random() });
    }
  };

  // update password
  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleConfPassword = (value) => {
    setConfPassword(value);
  };

  const handlePasswordUpdate = (e) => {
    if (password === confPassword) {
      updatePassword(password);
      setStatusBase({ msg: 'SUCCESS: Password updated.', key: Math.random() });
    } else {
      setStatusBase({ msg: 'ERROR: Passwords do not match', key: Math.random() });
    }
  };

  // update user image
  const uploadAvatar = useCallback(
    (data) => {
      let body;
      try {
        if (image) {
          localStorage.removeItem('picture');
          body = new FormData();
          body.append('image', image);
          api.post('/users/picture', body).then((res) => {
            localStorage.setItem('picture', res.data);
          });
        } else {
          body = data;
        }
        setStatusBase({ msg: 'SUCCESS: Image updated.', key: Math.random() });
      } catch (error) {
        setStatusBase({ msg: 'ERROR: Failure uploading image to database.', key: Math.random() });
        localStorage.removeItem('picture');
      }
    },
    [api, image],
  );

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Update Profile Picture</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container maxWidth="xs">
            <ImageUploadPreview image={image} setImage={setImage} />
            <Button color="primary" variant="contained" onClick={uploadAvatar}>
              UPDATE
            </Button>
            {status ? <AlertMessage key={status.key} message={status.msg} /> : null}
          </Container>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Update Username</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container maxWidth="xs">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label="new username"
                  onChange={(e) => handleUserName(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button color="primary" variant="contained" onClick={handleUserUpdate}>
              UPDATE
            </Button>
            {status ? <AlertMessage key={status.key} message={status.msg} /> : null}
          </Container>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Update Email</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container maxWidth="xs">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  type="email"
                  required
                  fullWidth
                  label="new email"
                  onChange={(e) => handleEmail(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button color="primary" variant="contained" onClick={handleEmailUpdate}>
              UPDATE
            </Button>
            {status ? <AlertMessage key={status.key} message={status.msg} /> : null}
          </Container>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Update Password</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container maxWidth="xs">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  type="password"
                  required
                  fullWidth
                  label="new password"
                  onChange={(e) => handlePassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  type="password"
                  required
                  fullWidth
                  label="confirm new password"
                  onChange={(e) => handleConfPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button color="primary" variant="contained" onClick={handlePasswordUpdate}>
              UPDATE
            </Button>
            {status ? <AlertMessage key={status.key} message={status.msg} /> : null}
          </Container>
        </AccordionDetails>
      </Accordion>
    </>
  );
};
