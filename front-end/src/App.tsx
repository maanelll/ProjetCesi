
import AppRoutes from './config/routes';
import AppLayout from "./layouts/AppLayout";
import { ThemeProvider } from "@mui/material"
import theme from "./theme"
import React, { useEffect, useContext } from 'react';
import { AuthContext } from './config/authContext';
import { initAxios } from './config/axios';

function App() {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    initAxios(authContext);
  }, [authContext]);

  return (
      <ThemeProvider theme={theme}>
        <AppLayout>
          <AppRoutes/>
        </AppLayout>
      </ThemeProvider>
  );
}

export default App;