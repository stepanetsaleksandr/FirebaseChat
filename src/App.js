import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Reset from "./components/Auth/Reset";
import Dashboard from "./components/Auth/Dashboard";
import { Switch, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { darkTheme, lightTheme } from "./theme/Theme";
import "./App.css";
function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className='App'>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          sx={{ position: "absolute", top: "0", right: "0", zIndex: "1" }}
        />
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/reset' element={<Reset />} />
            <Route exact path='/dashboard' element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
