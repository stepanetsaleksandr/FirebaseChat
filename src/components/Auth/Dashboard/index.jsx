import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <Container maxWidth='xl'>
      <Box
      // sx={{
      //   display: "flex",
      //   alignItems: "center",
      //   justifyContent: "center",
      //   height: "100vh",
      // }}
      >
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <div>
              <Typography variant='body2'>Logged in as:</Typography>
              <Typography variant='body2'>{name}</Typography>
              <Typography variant='body2'>{user?.email}</Typography>
            </div>

            <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
            <Button color='inherit' onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </Container>
  );
}
export default Dashboard;
