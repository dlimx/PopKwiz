import React from 'react';
import { useHistory } from 'react-router-dom';
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
    width: '80%',
    margin: 'auto',
  },
  heading: {
    fontSize: theme.typography.pxToRem(26),
    // flexBasis: '80%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(20),
    padding: 10,
    color: theme.palette.text.secondary,
  },
  headingDetails: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: '82.5%',
    flexShrink: 0,
    color: theme.palette.text.secondary,
  },
}));

// dummy database values

export const Quizlist = ({ quizList }) => {
  const classes = useStyles();
  const history = useHistory();
  // initialize state
  const [expanded, setExpanded] = React.useState(false);
  // hook to update state for accordion: https://material-ui.com/components/accordion/
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  console.log(quizList);
  return (
    <div className={classes.root}>
      <Box m={2}>
        {quizList.map((quiz, index) => (
          <Accordion key={quiz.id || index} expanded={expanded === quiz} onChange={handleChange(quiz)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{quiz.name}</Typography>
              <Typography className={classes.secondaryHeading}>{quiz.description}</Typography>
              {!!quiz.image && <img alt="Quiz Preview" src={quiz.image} />}
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={10}>
                <Grid item xs={11}>
                  <Typography>
                    {quiz?.questions?.length} Question{quiz.questions?.length === 1 ? '' : 's'}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      history.push(`/quiz/${quiz.id}`);
                    }}
                  >
                    View Details
                  </Button>
                </Grid>
              </Grid>
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
