import React, { useState, useCallback } from 'react';
import { Button, Typography, Accordion, Container, AccordionDetails } from '@material-ui/core';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import PersonIcon from '@material-ui/icons/Person';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../store/users/AuthContext';
import { FormBuilder } from '../components/FormBuilder';
import { ImageUploadPreview } from '../components/ImageUploadPreview';
import { useAPI } from '../api/api';

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

export function ProfileUpdate() {
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');
  const [confPassword, setconfPassword] = useState('');
  const [image, setImage] = useState('');
  const api = useAPI();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleEmail = (value) => {
    setEmail(value);
  };
  const handlePassword = (value) => {
    setPassword(value);
  };
  const handleConfPassword = (value) => {
    setconfPassword(value);
  };

  const uploadAvatar = useCallback(
    (data) => {
      let body;

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
    },
    [api, image],
  );

  // eslint-disable-next-line consistent-return
  function handleSubmit(e) {
    e.preventDefault();
    if (password !== confPassword) {
      return setError('Passwords do not match');
    }

    const promises = [];
    setLoading(true);
    setError('');

    if (email !== currentUser.email) {
      promises.push(updateEmail(email));
    }
    if (password) {
      promises.push(updatePassword(password));
    }

    Promise.all(promises)
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        setError('Failed to update account');
      })
      .finally(() => {
        setLoading(false);
      });
  }

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
          </Container>
        </AccordionDetails>
      </Accordion>

      {/* <FormBuilder
        header="Update Profile"
        fields={[
          {
            name: 'email',
            label: 'new email',
            type: 'email',
            id: 'email',
            autoComplete: 'email',
            value: email,
            onChange: handleEmail,
          },
          {
            name: 'password',
            label: 'new password',
            type: 'password',
            id: 'password',
            autoComplete: 'password',
            value: password,
            onChange: handlePassword,
          },
          {
            name: 'confpassword',
            label: 'confirm new password',
            type: 'password',
            id: 'confpassword',
            autoComplete: 'confpassword',
            value: confPassword,
            onChange: handleConfPassword,
          },
        ]}
        buttons={[
          {
            text: 'Submit',
            onClick: handleSubmit,
          },
        ]}
      >
        <PersonIcon />
      </FormBuilder> */}
    </>
  );
}
