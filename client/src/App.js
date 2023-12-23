import logo from './logo.svg';
import './App.css';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from './pages/home';
import LoginPage from './pages/login';
import ProfilePage from './pages/profile';
import Chat from './pages/chat';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
       <BrowserRouter>
       <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />}  />
            <Route
              path="/chat"
              element={isAuth ? <Chat /> : <Navigate to="/" />}
            />
          </Routes>
          </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
