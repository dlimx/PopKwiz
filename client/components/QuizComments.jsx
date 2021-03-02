import React, { useState }  from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Paper} from "@material-ui/core";
import Rating from '@material-ui/lab/Rating';


const useStyles = makeStyles({
    root: { //div
        padding: 50,
    },
    inner:{
        marginLeft: 20,
        marginRight: 20,
        marginbotton: 20,
    },
    paper: {
        padding: "40px 20px",
        margin: 15,
    },
    outer: {
        background: "rgba(0, 0, 0, 0.03)",
    },
    commenter: {
        margin: 0, 
        textAlign: "left",
    },
    comment: {
        textAlign: "left",
    },

  });

  //pass in comments object as prop
  export const QuizComments = ({ quizComments }) => {
    
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.outer} variant="outlined">
                <div className={classes.inner}>

                    <h1>Quiz Reviews</h1>

                {Object.keys(quizComments).map((key, index) => (
                <Paper elevation={1} className={classes.paper}>
                    <Grid container wrap="nowrap" spacing={2}>
                        <Grid item>
                            {/* picture url here */}
                        <Avatar src={"https://randomuser.me/api/portraits/men/" + (Math.floor(Math.random() * 99) + 1) + ".jpg"}/>
                        </Grid>
                        <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 className={classes.commenter}>{quizComments[key].user_name}</h4> 
                        <Rating name="read-only" value={quizComments[key].user_score} readOnly />
                        {/* replace test_name 'key' with name variable */}
                        <p className={classes.comment}>                        
                            {quizComments[key].user_comment}
                        </p>
                        </Grid>
                    </Grid>
                </Paper>
                ))}
                </div>
            </Paper>
        </div>
    )
}
