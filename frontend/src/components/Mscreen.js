import React from "react";
import { Container, Row } from "react-bootstrap";

const Mscreen = ({ title, children }) => {
  return (
    <div className="mscreen">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="heading">{title}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Mscreen;
