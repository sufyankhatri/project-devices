import { Typography } from "@mui/material";
import "./App.css";
import Project from "./Project/Project";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Typography variant="h4" align="left">
          Projects
        </Typography>
        <Project />
      </div>
    </div>
  );
}

export default App;
