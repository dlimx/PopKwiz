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
import { QuizConstants, QuizStrings, QuizTypes } from '../../../constants/quizConstants';
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
  optionContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  optionFormField: {
    marginRight: theme.spacing(2),
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const getNewOption = (type) => {
  if (type === QuizTypes.MultipleChoice) {
    return { option: '', correct: false };
  }
  return { option: '', correct: true };
};

const getTrueFalseOptions = (correct) => {
  return [
    {
      option: QuizConstants.True,
      correct: correct === QuizConstants.True,
    },
    {
      option: QuizConstants.False,
      correct: correct === QuizConstants.False,
    },
  ];
};

export const QuizCreateQuestion = ({ index, question }) => {
  const formik = useFormikContext();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const name = `questions[${index}]`;

  const handleOpen = (event, isOpen) => {
    if (event.target.name === `${name}.question`) return;
    setOpen(isOpen);
  };

  const renderAddOption = () => {
    if (!question) return null;
    return (
      <Button
        onClick={() =>
          formik.setFieldValue(`${name}.options`, [
            ...formik.values.questions[index].options,
            getNewOption(question.type),
          ])
        }
      >
        Add Option
      </Button>
    );
  };

  const renderOptions = () => {
    if (!question) return null;
    const { type, options } = question;

    switch (type) {
      case QuizTypes.MultipleChoice:
        return (
          <div className={classes.optionContainer}>
            <div className={classes.row}>
              <FormLabel>Answers</FormLabel>

              <FormLabel>Correct</FormLabel>
            </div>

            {options.map((option, optionIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={optionIndex} className={`${classes.row} ${classes.formField}`}>
                <FastField name={`${name}.options[${optionIndex}].option`}>
                  {({ field, meta }) => (
                    <DebouncedTextField
                      {...field}
                      className={classes.optionFormField}
                      label={`Option ${optionIndex + 1}`}
                      error={(formik.submitCount || meta.touched) && !!meta.error}
                    />
                  )}
                </FastField>
                <FastField name={`${name}.options[${optionIndex}].correct`}>
                  {({ field }) => <Checkbox {...field} />}
                </FastField>
              </div>
            ))}
            {renderAddOption()}
          </div>
        );
      case QuizTypes.TrueFalse:
        return (
          <FastField name={`${name}.options[0].option`}>
            {({ field, meta }) => (
              <FormControl className={classes.formField}>
                <FormLabel
                  htmlFor={`${name}.options[0]-form`}
                  error={(formik.submitCount || meta.touched) && !!meta.error}
                >
                  Answers
                </FormLabel>
                <RadioGroup
                  {...field}
                  onChange={(...args) => {
                    formik.setFieldValue(`${name}.options`, getTrueFalseOptions(args[1]));
                    field.onChange(...args);
                  }}
                  id={`${name}.options[0]-form`}
                >
                  <FormControlLabel
                    control={<Radio />}
                    label={QuizStrings[QuizConstants.True]}
                    value={QuizConstants.True}
                  />
                  <FormControlLabel
                    control={<Radio />}
                    label={QuizStrings[QuizConstants.False]}
                    value={QuizConstants.False}
                  />
                </RadioGroup>
              </FormControl>
            )}
          </FastField>
        );
      // case QuizTypes.FillInTheBlank:
      //   return (
      //     <div>
      //       {options.map((option) => (
      //         <p>{option}</p>
      //       ))}
      //       {renderAddOption()}
      //     </div>
      //   );
      case QuizTypes.ShortAnswer:
        return (
          <div className={classes.optionContainer}>
            <FormLabel htmlFor={`${name}.options`}>Answers</FormLabel>

            {options.map((option, optionIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <FastField key={optionIndex} name={`${name}.options[${optionIndex}].option`}>
                {({ field, meta }) => (
                  <DebouncedTextField
                    {...field}
                    label={`Option ${optionIndex + 1}`}
                    className={classes.formField}
                    error={(formik.submitCount || meta.touched) && !!meta.error}
                  />
                )}
              </FastField>
            ))}
            {renderAddOption()}
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
                  const options =
                    args[1] === QuizTypes.TrueFalse ? getTrueFalseOptions(QuizConstants.True) : [getNewOption(args[1])];
                  formik.setFieldValue(`${name}.options`, options);
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
        {renderOptions()}
      </AccordionDetails>
    </Accordion>
  );
};

QuizCreateQuestion.propTypes = {
  index: PropTypes.number.isRequired,
  question: PropTypes.shape({
    type: PropTypes.string,
    question: PropTypes.string,
    options: PropTypes.array,
  }).isRequired,
};
