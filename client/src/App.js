import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { getPosts } from './actions/postsActions';
import {makeStyles} from '@material-ui/core/styles';
import NavBar from './components/NavBar';
import Home from './components/Home';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Auth from './components/Auth/Auth';




import { BrowserRouter, Switch, Route } from 'react-router-dom';


const useStyles = makeStyles(() => ({
    app: {
        margin: '0 20px'
    },
    appBar: {

    }
  }));

const App = () => {
    const classes = useStyles(); // imports custom & material-ui css
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);


    return (
        <BrowserRouter>
            <div className={classes.app}>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <NavBar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signin" exact component={SignIn} />
                    <Route path="/signup" exact component={SignUp} />


                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;