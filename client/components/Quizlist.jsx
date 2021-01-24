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
const quizzes = [
  { id: 'Quiz #1', name: 'CS161 - Introduction to Computer Science (Final Exam)', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { id: 'Quiz #2', name: 'CS290 - Web Programming (Final Exam)', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { id: 'Quiz #3', name: 'CS344 - Operating Systems (Midterm Exam)', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { id: 'Quiz #4', name: 'CS372 - Introduction to Networking (Midterm Exam)', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
];

export const Quizlist = () => {
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
        {quizzes.map((quiz, index) => (
          <Accordion expanded={expanded === quiz} onChange={handleChange(quiz)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{quiz.id}</Typography>
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
