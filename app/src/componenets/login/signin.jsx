import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { login } from '../../store/actions';
import { useLazyFetch } from '../../hooks/useLazyFetch';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '35ch'
    }
  },
  btnwrapper: {
    display: 'inline-flex',
    '& > *': {
      margin: theme.spacing(0.2),
      textTransform: 'none'
    }
  }
}));

const theme = createMuiTheme({
  typography: {
    fontSize: 22
  }
});

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log(err);
  }
}

function Signin({ setIsRegiterd, onIncrementCounter, state, login }) {
  const classes = useStyles();
  const email = React.createRef();
  const password = React.createRef();
  const [fetcher, data] = useLazyFetch('http://localhost:5000/graphql');

  useEffect(() => {
    if (data.data) {
      login(data);
      saveToLocalStorage(data);
    }
  }, [data.data]);

  const handlesubmit = (event) => {
    event.preventDefault();

    const reqBody = {
      query: `
        query{
            login(email:"${email.current.value}", password:"${password.current.value.trim()}"){
               token
               name
               tokenExpiration
               userID
            }
        }
        `
    };

    fetcher(reqBody);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="login-title">
        <span className="login-text">Login to your accaunt</span>
        <p>
          Don't have an accaunt?{' '}
          <a href="#" onClick={(e) => setIsRegiterd(false)}>
            Sign up!
          </a>
        </p>
        <div>
          <form className={classes.root} autoComplete="off" onSubmit={handlesubmit}>
            <TextField id="standard-secondary" label="E-mail" inputRef={email} />
            <TextField id="standard-secondary" label="Password" inputRef={password} />
            <div className={classes.btnwrapper}>
              <Button type="submit" variant="contained" color="primary">
                <span>Login</span>
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={(e) => setIsRegiterd(false)}
              >
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    state: state.login
  };
};

export default connect(mapStateToProps, { login })(Signin);
