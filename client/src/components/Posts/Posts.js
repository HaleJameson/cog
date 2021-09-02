// Posts.js
import React from 'react';
import Post from './Post/Post.js';
import { useSelector } from 'react-redux';
import { Paper, Container } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
}));

const Posts = () => {
    const classes = useStyles(); // imports custom & material-ui css
    const posts = useSelector((state) => state.posts);
    console.log(posts);

    return (
        <Paper>
            <Post />
            <Post />
        </Paper>
    );
};

export default Posts;