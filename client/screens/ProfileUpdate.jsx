import React, { useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../store/users/AuthContext';
import { useAPI } from '../api/api';
import { storage } from '../authentication/firebase';
import { FileUpload } from '../components/FileUpload';
import { FormBuilder } from '../components/FormBuilder';

export function ProfileUpdate() {
  const api = useAPI();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');
  const [confPassword, setconfPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [url, setURL] = useState('');
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

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  // function handleUpload(e) {
  //   e.preventDefault();

  //   const uploadTask = storage.ref(`/images/${file.name}`).put(file);
  //   uploadTask.on('state_changed', console.log, console.error, () => {
  //     storage
  //       .ref('images')
  //       .child(file.name)
  //       .getDownloadURL()
  //       .then((urll) => {
  //         setFile(null);
  //         setURL(urll);
  //       });
  //   });
  // }

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
    <div>
      <FileUpload />
      {/* <div>
        <form onSubmit={handleUpload}>
          <input type="file" onChange={handleChange} />
          <button type="submit" disabled={!file}>
            upload to firebase
          </button>
        </form>
        <img src={url} alt="" />
      </div> */}
      <FormBuilder
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
      </FormBuilder>
    </div>
  );
}
