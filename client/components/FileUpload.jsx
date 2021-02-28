/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAPI } from '../api/api';
import { useAuth } from '../store/users/AuthContext';
import { useUser } from '../store/users/UserContext';

export const FileUpload = () => {
  const [file, setFile] = useState(null);
  const { currentUser } = useAuth();
  const { updateUser } = useUser();
  // const [user, setUser] = useState({});

  const api = useAPI();
  const history = useHistory();

  const send = (event) => {
    localStorage.clear();
    const data = new FormData();
    data.append('file', file);
    data.append('uid', currentUser.uid);
    updateUser(data);
    // api
    //   .post(`/users/picture/${currentUser.uid}`, data)
    //   .then((res) => {
    //     localStorage.removeItem('avatar');
    //   })
    //   .catch((err) => console.log(err));
    // history.push('/');
  };
  return (
    <div>
      <form action="#" encType="multipart/form-data">
        <div className="flex">
          <label htmlFor="file">File</label>
          <input
            type="file"
            id="file"
            accept="image/png, image/jpeg"
            onChange={(event) => {
              const f = event.target.files[0];
              setFile(f);
            }}
          />
        </div>
      </form>
      <button type="submit" onClick={send}>
        Send
      </button>
    </div>
  );
};
