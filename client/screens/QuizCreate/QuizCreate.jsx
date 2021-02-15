import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  ListItemText,
  InputLabel,
  FormControl,
  Checkbox,
} from '@material-ui/core';
import { Formik, Field, Form, FastField } from 'formik';
import { uniqueId } from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../store/users/AuthContext';
import { useAPI } from '../../api/api';
import { quizSchema } from '../../../constants/quizConstants';
import { QuizCreateQuestion } from './QuizCreateQuestion';
import { DebouncedTextField } from '../../components/DebouncedTextField';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
    width: '100%',
    flexGrow: 1,
  },
  root: {
    padding: theme.spacing(4),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
}));

export const QuizCreate = () => {
  const auth = useAuth();
  const api = useAPI();
  const history = useHistory();
  const classes = useStyles();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/categories').then(({ data }) => {
      setCategories(data.data);
    });
  }, [api]);

  const createQuiz = useCallback(
    (body) => {
      api.post('/quizzes', body).then((data) => {
        history.push('/');
      });
    },
    [api, history],
  );

  if (!auth.currentUser) {
    return <Redirect to="/login?to=/quiz/create" />;
  }

  return (
    <Container className={classes.root} component="main" maxWidth="lg">
      <Typography component="h1" variant="h5">
        Create Quiz
      </Typography>

      <Formik
        initialValues={{
          name: '',
          description: '',
          questions: [{ question: '', type: '', id: uniqueId() }],
          categories: [],
        }}
        onSubmit={createQuiz}
        validationSchema={quizSchema}
      >
        {({ setFieldValue, values }) => {
          return (
            <Form className={classes.form}>
              <FastField name="name">
                {({ field, meta }) => (
                  <DebouncedTextField
                    {...field}
                    error={meta.touched && !!meta.error}
                    label="Name"
                    className={classes.formField}
                  />
                )}
              </FastField>
              <FastField name="description">
                {({ field }) => (
                  <DebouncedTextField {...field} multiline label="Description" rows={4} className={classes.formField} />
                )}
              </FastField>

              <Field name="categories">
                {({ field, meta }) => (
                  <FormControl className={classes.formField}>
                    <InputLabel id="categories-label" htmlFor="categories-form">
                      Categories
                    </InputLabel>
                    <Select
                      {...field}
                      error={meta.touched && !!meta.error}
                      multiple
                      renderValue={(selected) => selected.map((category) => category.name).join(', ')}
                      id="categories-form"
                      labelId="categories-label"
                      MenuProps={{ variant: 'menu' }}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category}>
                          <Checkbox checked={values.categories.indexOf(category) > -1} />
                          <ListItemText primary={category.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Field>
              {values.questions.map((question, index) => (
                <QuizCreateQuestion question={question} key={question.id} index={index} />
              ))}
              <Button
                style={{ margin: '20px 0' }}
                onClick={() =>
                  setFieldValue('questions', [...values.questions, { question: '', type: '', id: uniqueId() }])
                }
              >
                Add Question
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Create Quiz
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};
