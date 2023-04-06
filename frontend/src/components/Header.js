import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const handler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="#">
          <Link to="/">Note-maker</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav>
            {userInfo ? (
              <>
                <NavDropdown
                  title={`${userInfo.name}`}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href="/mynotes">My Notes</NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handler}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>

          {/* <Nav style={{ maxHeight: "100px" }} navbarScroll>
            <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
              <NavDropdown.Item>My profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handler}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
