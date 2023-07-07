import NavbarComponent from "./Components/NavbarComponent";
import "./App.css";
import SignUp from "./Components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./Components/Welcome";
import Compose from "./Components/Compose";
import SentBox from "./Components/SentBox";
import Inbox from "./Components/Inbox";
import ReadMessages from "./Components/ReadMessages";
import SentMessages from "./Components/SentMessages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent />

        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/compose" element={<Compose />} />
          <Route path="/sent" element={<SentBox />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/inbox/:mailId" element={<ReadMessages />} />
          <Route path="/sentbox/:mailId" element={<SentMessages />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
