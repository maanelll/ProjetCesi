
import AppRoutes from './config/routes';
import AppLayout from "./layouts/AppLayout";
import { ThemeProvider } from "@mui/material"
import theme from "./theme"


function App() {
  return (
      <ThemeProvider theme={theme}>
        <AppLayout>
          <AppRoutes/>
        </AppLayout>
      </ThemeProvider>
  );
}

export default App;