import React from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import ImgTodolist from "../assesst/ImgTodolist.jpg";
function SignUpPage() {

    const colStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      };


  return (
    <Container>
      <Row>
        <Col>
          <img
            src={ImgTodolist}
            alt=""
            style={{ width: "100%", height: "100vh" }}
          />
        </Col>
        <Col style={colStyle}>
          <div>
            <p style={{ fontSize: "50px", fontWeight: "bold" }}>Welcome to TodoList!</p>
           <h3> Register Your Account. </h3>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                {" "}
                <PersonIcon />{" "}
              </InputGroup.Text>
              <Form.Control
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                {" "}
                <EmailIcon />{" "}
              </InputGroup.Text>
              <Form.Control
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                {" "}
                <KeyIcon />{" "}
              </InputGroup.Text>
              <Form.Control
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpPage;
