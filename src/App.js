import NavbarComponent from "./Components/NavbarComponent";
import "./App.css";
import SignUp from "./Components/SignUp";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent />
        <SignUp />
      </BrowserRouter>
    </div>
  );
}

export default App;
