import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import Redirect from "react-router-dom";
import { useDispatch } from "react-redux";
import { mailActions } from "../Store/Mail";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("idToken");
    navigate("/", { replace: true });
    dispatch(mailActions.manageAuthentication(false));
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">MyWebLink</Navbar.Brand>
        <Nav.Link>Home</Nav.Link>
        <Nav.Link>Products</Nav.Link>
        <Nav.Link>About Us</Nav.Link>
        <Nav.Link onClick={logout}>Logout</Nav.Link>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
