import React, { useState } from 'react';
import { FastField, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { QuizStrings, QuizTypes } from '../../../constants/quizConstants';
import { DebouncedTextField } from '../../components/DebouncedTextField';

const useStyles = makeStyles((theme) => ({
  formField: {
    marginBottom: theme.spacing(2),
  },
  questionField: {
    width: '100%',
  },
  formFieldMarginRight: {
    marginRight: theme.spacing(2),
  },
  answerContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  answerFormField: {
    marginRight: theme.spacing(2),
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

export const QuizCreateQuestion = ({ index, question }) => {
  const formik = useFormikContext();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const name = `questions[${index}]`;

  const handleOpen = (event, isOpen) => {
    if (event.target.name === `${name}.question`) return;
    setOpen(isOpen);
  };

  const renderAddAnswer = () => {
    if (!question) return null;
    return (
      <Button
        onClick={() =>
          formik.setFieldValue(`${name}.answers`, [...formik.values.questions[index].answers, { answer: '' }])
        }
      >
        Add Answer
      </Button>
    );
  };

  const renderAnswers = () => {
    if (!question) return null;
    const { type, answers } = question;

    switch (type) {
      case QuizTypes.MultipleChoice:
        return (
          <div className={classes.answerContainer}>
            <div className={classes.row}>
              <FormLabel>Answers</FormLabel>

              <FormLabel>Correct</FormLabel>
            </div>

            {answers.map((answer, answerIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={answerIndex} className={`${classes.row} ${classes.formField}`}>
                <FastField name={`${name}.answers[${answerIndex}].answer`}>
                  {({ field, meta }) => (
                    <DebouncedTextField
                      {...field}
                      className={classes.answerFormField}
                      multiline
                      label={`Option ${answerIndex + 1}`}
                      error={(formik.submitCount || meta.touched) && !!meta.error}
                    />
                  )}
                </FastField>
                <FastField name={`${name}.answers[${answerIndex}].correct`}>
                  {({ field }) => <Checkbox {...field} multiline />}
                </FastField>
              </div>
            ))}
            {renderAddAnswer()}
          </div>
        );
      case QuizTypes.TrueFalse:
        return (
          <FastField name={`${name}.answers[0].answer`}>
            {({ field, meta }) => (
              <FormControl className={classes.formField}>
                <FormLabel
                  htmlFor={`${name}.answers[0]-form`}
                  error={(formik.submitCount || meta.touched) && !!meta.error}
                >
                  Answer
                </FormLabel>
                <RadioGroup
                  {...field}
                  onChange={(...args) => {
                    formik.setFieldValue(`${name}.answers`, []);
                    field.onChange(...args);
                  }}
                  id={`${name}.answers[0]-form`}
                >
                  <FormControlLabel control={<Radio />} label="True" value="TRUE" />
                  <FormControlLabel control={<Radio />} label="False" value="FALSE" />
                </RadioGroup>
              </FormControl>
            )}
          </FastField>
        );
      // case QuizTypes.FillInTheBlank:
      //   return (
      //     <div>
      //       {answers.map((answer) => (
      //         <p>{answer}</p>
      //       ))}
      //       {renderAddAnswer()}
      //     </div>
      //   );
      case QuizTypes.ShortAnswer:
        return (
          <div className={classes.answerContainer}>
            <FormLabel htmlFor={`${name}.answers`}>Answers</FormLabel>

            {answers.map((answer, answerIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <FastField key={answerIndex} name={`${name}.answers[${answerIndex}].answer`}>
                {({ field, meta }) => (
                  <DebouncedTextField
                    {...field}
                    label={`Answer ${answerIndex + 1}`}
                    className={classes.formField}
                    error={(formik.submitCount || meta.touched) && !!meta.error}
                  />
                )}
              </FastField>
            ))}
            {renderAddAnswer()}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Accordion expanded={open} onChange={handleOpen}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <FastField name={`${name}.question`}>
          {({ field, meta }) => (
            <DebouncedTextField
              {...field}
              multiline
              label={`Question ${index + 1}`}
              className={classes.questionField}
              error={(formik.submitCount || meta.touched) && !!meta.error}
            />
          )}
        </FastField>
      </AccordionSummary>
      <AccordionDetails>
        <FastField name={`${name}.type`}>
          {({ field, meta }) => (
            <FormControl className={`${classes.formField} ${classes.formFieldMarginRight}`}>
              <FormLabel htmlFor={`${name}-form`} error={(formik.submitCount || meta.touched) && !!meta.error}>
                Question Type
              </FormLabel>
              <RadioGroup
                {...field}
                onChange={(...args) => {
                  formik.setFieldValue(`${name}.answers`, [{ answer: '' }]);
                  field.onChange(...args);
                }}
                id={`${name}-form`}
              >
                {Object.values(QuizTypes).map((quizType) => (
                  <FormControlLabel control={<Radio />} label={QuizStrings[quizType]} key={quizType} value={quizType} />
                ))}
              </RadioGroup>
            </FormControl>
          )}
        </FastField>
        {renderAnswers()}
      </AccordionDetails>
    </Accordion>
  );
};

QuizCreateQuestion.propTypes = {
  index: PropTypes.number.isRequired,
  question: PropTypes.shape({
    type: PropTypes.string,
    question: PropTypes.string,
    answers: PropTypes.array,
  }).isRequired,
};
