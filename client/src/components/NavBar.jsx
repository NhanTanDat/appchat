import { useContext, useState } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Notifications from "./Chat/Notifications";
import avarter from "../assets/avarter.svg";
import homeicon from "../assets/icons8-home.svg";
import ChatCircleDots from "../assets/ChatCircleDots.svg";
import bell from "../assets/Bell.svg";


const NavBar = ({togglePopupAccountInformation}) => {
  const { user, logoutUser } = useContext(AuthContext);
  

  return (
    <Navbar className="mb-4" style={{ height: "70px", background: "#ffffff" }}>
     
      <Container fluid>
        <h2>
          <Link to="/" className="text-decoration-none">
            Hallo
          </Link>
        </h2>
        <Stack direction="horizontal" gap={5}>
          <Link to="/home" className="text-decoration-none">
            <img src={homeicon} alt="home-icon" height="35px" />
          </Link>
          <img src={homeicon} alt="home-icon" height="35px" />
          <img src={homeicon} alt="home-icon" height="35px" />
          <img src={homeicon} alt="home-icon" height="35px" />
        </Stack>
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {!user ? (
              <>
                <Link to="/login" className="text-decoration-none">
                  Login
                </Link>
                <Link to="/register" className="text-decoration-none">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Notifications />
                <Link to="/chat" className="text-decoration-none">
                  <img src={ChatCircleDots} alt="chat-icon" height="35px" />
                </Link>
                <img
                  src={avarter}
                  alt="avatar"
                  height="35px"
                  onClick={togglePopupAccountInformation}
                  style={{ cursor: "pointer" }}
                />
                <Link
                  onClick={() => logoutUser()}
                  to="/login"
                  className="text-decoration-none"
                >
                  Đăng xuất
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
