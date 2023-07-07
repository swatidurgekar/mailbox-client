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
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.mails.isAuthenticated);

  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent />

        <Routes>
          <Route path="/" element={<SignUp />} />
          {isAuthenticated && <Route path="/welcome" element={<Welcome />} />}
          {isAuthenticated && <Route path="/compose" element={<Compose />} />}
          {isAuthenticated && <Route path="/sent" element={<SentBox />} />}
          {isAuthenticated && <Route path="/inbox" element={<Inbox />} />}
          {isAuthenticated && (
            <Route path="/inbox/:mailId" element={<ReadMessages />} />
          )}
          {isAuthenticated && (
            <Route path="/sentbox/:mailId" element={<SentMessages />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
