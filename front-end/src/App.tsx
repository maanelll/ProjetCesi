
import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from './config/routes';
import AppLayout from "./layouts/AppLayout";
import { ThemeProvider } from "@mui/material"
import theme from "./theme"


function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppLayout>
          <AppRoutes/>
        </AppLayout>
      </ThemeProvider>
    </Router>
  );
}

export default App;