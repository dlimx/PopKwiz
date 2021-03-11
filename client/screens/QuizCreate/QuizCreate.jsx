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
import { uniqueId, isEmpty } from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../../store/users/AuthContext';
import { useAPI } from '../../api/api';
import { quizSchema } from '../../../constants/quizConstants';
import { QuizCreateQuestion } from './QuizCreateQuestion';
import { DebouncedTextField } from '../../components/DebouncedTextField';
import { exportQuiz } from './exportQuiz';
import { ImageUploadPreview } from '../../components/ImageUploadPreview';

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
    marginBottom: theme.spacing(2),
  },
}));

const defaultValues = {
  name: '',
  description: '',
  questions: [{ question: '', type: '', options: [], id: uniqueId() }],
  category: '',
};

export const QuizCreate = () => {
  const auth = useAuth();
  const api = useAPI();
  const history = useHistory();
  const classes = useStyles();

  const [formikValues, setFormikValues] = useState(defaultValues);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [image, setImage] = useState('');
  const [questionImages, setQuestionImages] = useState({});

  useEffect(() => {
    api.get('/categories').then(({ data }) => {
      setCategories(data.data);
    });
  }, [api]);

  const createQuiz = useCallback(
    (data) => {
      let body;
      if (image || !isEmpty(questionImages)) {
        body = new FormData();
        Object.keys(data).forEach((key) => {
          if (typeof data[key] === 'object') {
            body.append(key, JSON.stringify(data[key]));
          } else {
            body.append(key, data[key]);
          }
        });

        if (image) {
          body.append('image', image);
        }

        if (!isEmpty(questionImages)) {
          Object.keys(questionImages).forEach((questionId) => {
            body.append(`${questionId}Image`, questionImages[questionId]);
          });
        }
      } else {
        body = data;
      }
      api.post('/quizzes', body).then((res) => {
        history.push('/');
      });
    },
    [api, history, image, questionImages],
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
      console.error(e);
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

          const handleRemove = (id) => {
            const newQuizzes = values.questions.filter((question) => question.id !== id);
            if (!newQuizzes.length) {
              newQuizzes.push([{ question: '', type: '', options: [], id: uniqueId() }]);
            }
            setFieldValue('questions', newQuizzes);
            if (questionImages[id]) {
              const newQuestionImages = {
                ...questionImages,
              };
              delete newQuestionImages[id];
              setQuestionImages(newQuestionImages);
            }
          };

          return [
            <div className={classes.row} key="header">
              <Typography component="h1" variant="h5">
                Create Quiz
              </Typography>
              <div>
                <Button style={{ marginRight: 20 }} variant="contained" component="label">
                  Import
                  <input type="file" accept="application/JSON" hidden onChange={importQuiz} />
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
            <div className={classes.row} key="image">
              <ImageUploadPreview image={image} setImage={setImage} />
            </div>,
            <Form className={classes.form} key="form">
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

              <Field name="category">
                {({ field, meta }) => (
                  <FormControl className={classes.formField}>
                    <InputLabel id="categories-label" htmlFor="categories-form">
                      Categories
                    </InputLabel>
                    <Select
                      {...field}
                      error={meta.touched && !!meta.error}
                      renderValue={(selected) => selected}
                      id="categories-form"
                      labelId="categories-label"
                      MenuProps={{ variant: 'menu' }}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.name}>
                          <Checkbox checked={field.value === category.name} />
                          <ListItemText primary={category.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Field>
              {values.questions.map((question, index) => (
                <QuizCreateQuestion
                  question={question}
                  key={question.id}
                  index={index}
                  handleRemove={() => handleRemove(question.id)}
                  setQuestionImage={(newImage) => {
                    const newQuestionImages = {
                      ...questionImages,
                      [question.id]: newImage,
                    };
                    setQuestionImages(newQuestionImages);
                  }}
                  questionImage={questionImages[question.id]}
                />
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
