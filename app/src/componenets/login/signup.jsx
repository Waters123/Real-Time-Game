import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

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

export function SignUp({ setIsRegiterd }) {
  const classes = useStyles();
  const emailEl = React.createRef();
  const passwordEl = React.createRef();
  const userName = React.createRef();

  const handlesubmit = (event) => {
    event.preventDefault();
    const email = emailEl.current.value;
    const password = passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    console.log(email, password);
    const reqBody = {
      query: `
         mutation{
            createUser(userInput:{name:"${userName.current.value}",email:"${email}",password:"${password}"}){
                name  
            }
         }
        `
    };

    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="login-title">
        <span className="login-text">Register accaunt</span>

        <div>
          <form className={classes.root} autoComplete="off" onSubmit={handlesubmit}>
            <TextField id="standard-secondary" label="E-mail" inputRef={emailEl} />
            <TextField id="standard-secondary" label="Username" inputRef={userName} />
            <TextField
              id="standard-secondary"
              label="Password"
              inputRef={passwordEl}
              type="password"
            />
            <div className={classes.btnwrapper}>
              <Button type="submit" variant="contained" color="primary">
                <span>Register</span>
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={(e) => setIsRegiterd(true)}
              >
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
}
