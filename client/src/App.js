import React, { useEffect } from 'react';

import { Container, AppBar, Typography, Grow, Grid, ThemeProvider, Paper, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/postsActions';
import CreatePostForm from './components/CreatePostForm/CreatePostForm.js';
import MenuProfile from './components/MenuProfile/MenuProfile.js';
import Posts from './components/Posts/Posts.js';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    app: {
      display: 'flex',
      //height: '100%', 
      //width: '100%',
    },
    appBar: {
      borderRadius: 15,
      margin: '30px 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }
  }));

const App = () => {
    const classes = useStyles(); // imports custom & material-ui css
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);


    return (
            <Container maxWidth="lg" disableGutters>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <AppBar className={classes.appBar} position="static" color="inherit">
                    <Typography variant="h2" align="center" color="secondary">Cog</Typography>
                    <MenuProfile></MenuProfile>
                </AppBar>
                <Grow in >
                    <Grid container spacing={3}>
                        <Grid item xs={6} >
                            <CreatePostForm/>
                        </Grid>                    
                    </Grid>
                </Grow>
            </Container>
    )
}

export default App;