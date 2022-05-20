import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Button from "@mui/material/Button";
import { TextField, Box, Paper } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "350px",
          height: "350px",
          padding: "20px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='E-mail Address'
          id='outlined-email-input'
          type='text'
          size='small'
        />

        <TextField
          id='outlined-password-input'
          type='password'
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          size='small'
        />
        <Button
          variant='contained'
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </Button>

        <Button variant='contained' onClick={signInWithGoogle}>
          Login with Google
        </Button>

        <div className='login-link'>
          <Link to='/reset'>Forgot Password</Link>
        </div>
        <div className='login-link'>
          <span>Don't have an account?&nbsp;</span>
          <Link to='/register'>Register</Link>
          &nbsp;now.
        </div>
      </Paper>
    </Box>
  );
}
export default Login;
