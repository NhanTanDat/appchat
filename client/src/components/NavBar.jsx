import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Notifications from "./Chat/Notifications";
import avarter from "../assets/avarter.svg";
import homeicon from "../assets/icons8-home.svg";
import ChatCircleDots from "../assets/ChatCircleDots.svg"
import bell from "../assets/Bell.svg"
const NavBar = () => {
const { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "70px" }}>
      <Container fluid>
        
        <h2>
          <Link to="/" className="link-light text-decoration-none" >
           Hallo
          </Link>
        </h2>
        <Stack direction="horizontal" gap={5}>
        <Link to="/home" className="link-light text-decoration-none" >
          <img src={homeicon} alt="person-circle" height="35px" style={{ filter: 'invert(100%)' }} />
        </Link>
        <img src={homeicon} alt="person-circle" height="35px" style={{ filter: 'invert(100%)' }} />
        <img src={homeicon} alt="person-circle" height="35px" style={{ filter: 'invert(100%)' }} />
        <img src={homeicon} alt="person-circle" height="35px" style={{ filter: 'invert(100%)' }} />
        </Stack>
        
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {!user && (
              <>
                <Link to="/login" className="link-light text-decoration-none">
                  
                  Login
                </Link>
                <Link
                  to="/register"
                  className="link-light text-decoration-none"
                >
                  Register
                </Link>
              </>
            )}
            {user && (
              <>
                <Notifications />
                <Link to="/chat" className="link-light text-decoration-none">
                <img src={ChatCircleDots} alt="person-circle" height="35px" style={{ filter: 'invert(100%)' }}/>
                </Link>
                
                <img src={avarter} alt="person-circle" height="35px" style={{ filter: 'invert(100%)' }}/>
                <Link
                  onClick={() => logoutUser()}
                  to="/login"
                  className="link-light text-decoration-none"
                >
                  Logout
                </Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default NavBar;