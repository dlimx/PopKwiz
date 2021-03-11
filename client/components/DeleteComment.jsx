import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { useAPI } from '../api/api';
// pass in quiz id and verify with useAuth context to authorize

export const DeleteComment = ({ quizID, editVal, setEdit }) => {
  // https://github.com/axios/axios/issues/736
  const api = useAPI();
  return (
    <>
      {/* <div>{quizID}</div> */}
      <Box mx={1}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            api
              .delete('/quizzes/rating', {
                params: { Quiz: quizID },
              })
              .then((res) => {
                // setTimeout(() => setEdit(editVal + 1), 500);
                setEdit(editVal + 1);
              });
          }}
        >
          Delete
        </Button>
      </Box>
    </>
  );
};

DeleteComment.propTypes = {
  quizID: PropTypes.string.isRequired,
  editVal: PropTypes.number.isRequired,
  setEdit: PropTypes.func.isRequired,
};
