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
import { exportQuiz } from './exportQuiz';

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
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const defaultValues = {
  name: '',
  description: '',
  questions: [{ question: '', type: '', options: [], id: uniqueId() }],
  categories: [],
};

export const QuizCreate = () => {
  const auth = useAuth();
  const api = useAPI();
  const history = useHistory();
  const classes = useStyles();

  const [formikValues, setFormikValues] = useState(defaultValues);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

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

  const parseQuiz = useCallback(async (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (!data) {
        throw new Error();
      }

      const quiz = { ...defaultValues, ...quizSchema.cast(data) };
      setFormikValues(quiz);
    } catch (e) {
      console.log(e);
      setError('An unexpected error occurred');
    }
  }, []);

  const importQuiz = useCallback(
    async (event) => {
      setError('');
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = parseQuiz;
      fileReader.readAsText(file);
      setFormikValues({ name: 'hello world', questions: [], categories: [] });
    },
    [parseQuiz],
  );

  if (!auth.currentUser) {
    return <Redirect to="/login?to=/quiz/create" />;
  }

  return (
    <Container className={classes.root} component="main" maxWidth="lg">
      <Formik initialValues={formikValues} onSubmit={createQuiz} validationSchema={quizSchema} enableReinitialize>
        {(formik) => {
          const { setFieldValue, values } = formik;
          return [
            <div className={classes.row}>
              <Typography component="h1" variant="h5">
                Create Quiz
              </Typography>
              <div>
                <Button style={{ marginRight: 20 }} variant="contained" component="label">
                  Import
                  <input type="file" hidden onChange={importQuiz} />
                </Button>
                <Button variant="contained" onClick={() => exportQuiz(values)}>
                  Export
                </Button>
              </div>
            </div>,
            error && (
              <Typography component="p" color="error">
                {error}
              </Typography>
            ),
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
                  setFieldValue('questions', [
                    ...values.questions,
                    { question: '', type: '', options: [], id: uniqueId() },
                  ])
                }
              >
                Add Question
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Create Quiz
              </Button>
            </Form>,
          ];
        }}
      </Formik>
    </Container>
  );
};
