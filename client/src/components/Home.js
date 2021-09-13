import React, { useEffect } from 'react';

import { Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from '../actions/postsActions';
import CreatePostForm from './CreatePostForm/CreatePostForm.js';
import {makeStyles} from '@material-ui/core/styles';



const useStyles = makeStyles(() => ({

  }));

const Home = () => {
    const classes = useStyles(); // imports custom & material-ui css
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);


    return (
        <Grow in >
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <CreatePostForm />
                </Grid>                    
            </Grid>
        </Grow>
    )
}

export default Home;