import React from "react";
import { Col, Container, Form, Row, Button, FormGroup } from "react-bootstrap";

function LoginPage() {
  const colStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Container>
      <Row>
        <Col sm={8} style={colStyle}>
          <div>
            <h1>Login to Your Account</h1>
            <hr />
            <Form>
              <Form.Group className="mb-3">
                <Form.Control style={{ borderRadius: "35px" }} type="email" placeholder="Enter email..."/>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  style={{ borderRadius: "35px" }}
                  type="password"
                  placeholder="Enter Password...."
                />
              </Form.Group>
              <Button
                variant="outline-success"
                type="submit"
                style={{ borderRadius: "25px" }}
                className="mb-3"
              >
                Submit
              </Button>
            </Form>
          </div>
        </Col>
        <Col
          style={{
            backgroundColor: "greenyellow",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <p style={{ fontSize: "50px", fontWeight: "bold" }}>New Here?</p>
            <h3> Sign Up to create your own Todolist </h3>
            <Button variant="light" style={{ borderRadius: "25px" }}>
              Sign Up
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
