/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useAuth } from '../store/users/AuthContext';
import { useUser } from '../store/users/UserContext';

export const FileUpload = () => {
  const [file, setFile] = useState(null);
  const { currentUser } = useAuth();
  const { updateUser } = useUser();

  const send = (event) => {
    localStorage.clear();
    const data = new FormData();
    data.append('file', file);
    data.append('uid', currentUser.uid);
    updateUser(data);
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
