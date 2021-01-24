import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const subjects = [
  { name: 'Math' },
  { name: 'English' },
  { name: 'Science' },
  { name: 'Computer' },
];

const useStyles = makeStyles((theme) => ({
  catButton: {
    padding: theme.spacing(3),
    textAlign: 'center',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export const Category = () => {
  const classes = useStyles();
  return (
    <div>
      <Box m={2}>
        <Grid container spacing={3}>
          {subjects.map((subject, index) => (
            <Grid item xs={3}>
              <Button className={classes.catButton} onClick={() => { console.log(index); }}>{subject.name}</Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};
