/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useAPI } from '../api/api';
import { useAuth } from '../store/users/AuthContext';

export const FileUpload = () => {
  const [file, setFile] = useState(null);
  const { currentUser } = useAuth();
  // const [user, setUser] = useState({});

  const api = useAPI();

  const send = (event) => {
    const data = new FormData();
    data.append('file', file);
    data.append('uid', currentUser.uid);
    api
      .post(`/users/picture/${currentUser.uid}`, data)
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem('avatar');
      })
      .catch((err) => console.log(err));
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
