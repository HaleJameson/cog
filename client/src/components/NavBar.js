import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import {Link, useHistory, useLocation} from 'react-router-dom';
import  { useDispatch } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    borderRadius: 15,
    margin: '15px 0',
    display: 'flex',
    //   flexDirection: 'row',
    //   justifyContent: 'center',
    //   alignItems: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();


  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location])

  const logout = () => {
    dispatch({type: 'LOGOUT'});
    history.push('/');
    setUser(null);
  }


  return (
    <div >
      <AppBar position="static" className={classes.root} color='secondary'>
        <Toolbar color='primary'>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>Cog</Typography>
          { user ? (
              <div className={classes.profile}>
                  {/*<Avatar className={classes.avatar} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>*/}
                  <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                  <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
              </div>
          ) : (
            <div>
                <Button component={Link} to="/signin" color="inherit">Login</Button>
            </div>

          )

          }
          
        </Toolbar>
      </AppBar>
    </div>
  );
}