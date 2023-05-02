import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { removeAuthUser, getAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";
import "../css/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();

  const Logout = () => {
    removeAuthUser();
    navigate("/home");
  };
  return (
    <>
      <Navbar className="head-head" variant="dark">
        <Container>
          <Navbar.Brand className="me-auto">
            <Link className="nav-link" to={"/"}>
              M E D S
            </Link>
          </Navbar.Brand>

          <Nav>
            {/* Unuthenticated Routes */}
            {!auth && (
              <>
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
                <Link className="nav-link" to={"/register"}>
                  Register
                </Link>
              </>
            )}

            {/* Admin Routes */}
            {auth && auth.type === 1 && (
              <>
                <Link className="nav-link" to={"/ManageMeds"}>
                  Manage Meds
                </Link>
                <Link className="nav-link" to={"/ManageCategories"}>
                  Manage Category
                </Link>
                <Link className="nav-link" to={"/ManageUsers"}>
                  Manage Users
                </Link>
                <Link className="nav-link" to={"/ManageRequests"}>
                  Manage Requestes
                </Link>
              </>
            )}
          </Nav>

          {/* Authenticated Routes */}
          {auth && (
            <Nav>
              <Link className="nav-link" to={"/ShowRequestes"}>
                My Requestes
              </Link>
              <Link className="nav-link" to={"/Gethistory"}>
                My history
              </Link>
              <Nav.Link onClick={Logout}>Logout</Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
