import { Box, Button, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
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
          height: "180px",
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
        <Button variant='contained' onClick={() => sendPasswordReset(email)}>
          Send password reset email
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
export default Reset;
