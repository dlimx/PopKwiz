import React from 'react';
import { Card, CardContent, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAPI } from '../api/api';
// import { getQuiz } from '../../server/quizzes/controller'

// const useStyles = makeStyles((theme) => ({
//     formField: {
//       marginBottom: theme.spacing(2),
//     },
//     questionField: {
//       width: '100%',
//     },
//     formFieldMarginRight: {
//       marginRight: theme.spacing(2),
//     },
//     answerContainer: {
//       display: 'flex',
//       flexDirection: 'column',
//       flexGrow: 1,
//     },
//     answerFormField: {
//       marginRight: theme.spacing(2),
//       width: '100%',
//     },
//     row: {
//       display: 'flex',
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//     },
//   }));

//   export const QuizTake = (props) => {
//     const classes = useStyles();
//     const api = useAPI();
//     const id = useParams();

//     const loadQuiz = async (id) => {
//         const TEST_QUIZ = 'MiEleTKIYs6W3j76gpvw'
//         api.get('/quizzes?quizID=${TEST_QUIZ}')
//         console.log('got quiz')
//         console.log(quiz.data)
//     }

//     return (
//         <div classsName={classes.root}>
//             {console.log}
//             <Container >
//                 <Card>
//                     <Typography variant='h4'>
//                         Quiz: QuizNameHere{props.quizName}
//                     </Typography>
//                     <Typography variant='subtitle1'>
//                         Decription about how great this quiz is and stuff.
//                     </Typography>
//                 </Card>
//                 <br />
//                 <Card>
//                     <CardContent>
//                         <Typography variant='subtitle1'>
//                             Question: Number{props.questionNumber}
//                         </Typography>
//                         <Typography>
//                             Question - Text{props.question}
//                         </Typography>
//                         <Typography>
//                             Answers - Text{props.answers}
//                         </Typography>
//                     </CardContent>
//                 </Card>
//             </Container>
//         </div>
//     )
// }
