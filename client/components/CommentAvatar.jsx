import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { useAPI } from '../api/api';

export const CommentAvatar = ({ id }) => {
  const api = useAPI();
  const [URL, setURL] = useState();

  useEffect(() => {
    api.get(`/users/${id}?random_number=${new Date().getTime()}`).then(({ data }) => {
      setURL(data.picture);
    });
  }, [api, id]);
  return <Avatar src={URL} />;
};

CommentAvatar.propTypes = {
  id: PropTypes.object,
};
