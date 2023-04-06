import React, { useEffect } from "react";
import "./LandingPage.css";
import { Button, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Notemaker</h1>
              <p className="subtitle">one safe place for your notes</p>
            </div>
            <div className="buttonContainer">
              <Link to="/auth">
                <Button
                  size="lg"
                  className="landingButton"
                  // variant="outline-primary"
                >
                  Login / Signup
                </Button>
              </Link>
              {/* <NavLink><Button size="lg" className='landingButton' variant='outline-primary'>Sign-Up</Button></NavLink> */}
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
