// import logo from "./logo.svg";
import { createTheme, ThemeProvider } from "@mui/system";
import "./App.css";
import Sidebar from "./components/Sidebar";

const theme = createTheme({
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 0,
          '&:last-child': {
            paddingBottom: 0,
          }
        }
      }
    }
  }
})

function App() {
  return (
      <div className="App">
        <Sidebar />
      </div>
  );
}

export default App;
