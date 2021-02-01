import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

// return list of quizzes

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

// dummy database values

export const Quizlist = ({ quizList }) => {
  const classes = useStyles();
  // initialize state
  const [expanded, setExpanded] = React.useState(false);
  // hook to update state for accordion: https://material-ui.com/components/accordion/
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Box m={2}>
        {quizList.map((quiz) => (
          <Accordion expanded={expanded === quiz} onChange={handleChange(quiz)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>

              <Typography className={classes.heading}>{quiz.name}</Typography>

              <Typography className={classes.secondaryHeading}>{quiz.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Grid container spacing={12}>
                  <Grid item xs={11}>{quiz.description}</Grid>
                  <Grid item xs={1}><Button variant="contained" color="primary">Start</Button></Grid>
                </Grid>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </div>
  );
};

Quizlist.propTypes = {
  quizList: PropTypes.arrayOf(Object).isRequired,
};
