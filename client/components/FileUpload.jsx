/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import multer from 'multer';
import { useAPI } from '../api/api';
import { useAuth } from '../store/users/AuthContext';

export const FileUpload = () => {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const { currentUser } = useAuth();

  const api = useAPI();

  const send = (event) => {
    const data = new FormData();
    data.append('name', name);
    data.append('file', file);
    api
      .post(`/users/picture/${currentUser.uid}`, data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form action="#">
        <div className="flex">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={(event) => {
              const { value } = event.target;
              setName(value);
            }}
          />
        </div>

        <div className="flex">
          <label htmlFor="file">File</label>
          <input
            type="file"
            id="file"
            accept=".jpg"
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
