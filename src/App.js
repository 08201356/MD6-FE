import './App.css';
import Router from "./Route/Router";
import {createTheme, ThemeProvider} from "@mui/material";
import WebSocketComponent from "./Socket/WebSocketComponent";


function App() {
    const theme = createTheme();
  return (
    <div className="App">
        <ThemeProvider theme={theme}>
            <WebSocketComponent />
        </ThemeProvider>
    </div>
  );
}

export default App;
