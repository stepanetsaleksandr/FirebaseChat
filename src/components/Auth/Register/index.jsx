import { Box, Button, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard", { replace: true });
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Full Name'
          type='text'
          size='small'
        />
        <TextField
          type='text'
          className='register__textBox'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='E-mail Address'
          size='small'
        />
        <TextField
          type='password'
          className='register__textBox'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          size='small'
        />
        <Button variant='contained' onClick={register}>
          Register
        </Button>
        <Button variant='contained' onClick={signInWithGoogle}>
          Register with Google
        </Button>
        <div className='login-link'>
          <span>Don't have an account?&nbsp;</span>
          <Link to='/register'>Register</Link>
          &nbsp;now.
        </div>
      </Paper>
    </Box>
  );
}
export default Register;
