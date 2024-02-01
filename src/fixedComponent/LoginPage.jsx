import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button, FormGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function LoginPage() {
  const colStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  
  const userMatched = () => toast.success("User Logged In");
  const userNotMatched = () => toast.error("User/Password Incorrect");

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8888/users").then((res) => {
      setUserList(res.data);
    });
  }, []);

  const handleUserLogin = (event) => {
    const { name, value } = event.target;
    setLoginDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateUser = () => {
    userList.map((item) => {
      if (
        item.email === loginDetails.email &&
        item.password === loginDetails.password
      ) {
        userMatched();
      } else {
        userNotMatched();
      }
    });
    setLoginDetails({
      email: "",
      password: "",
    });
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    validateUser();
  };

  return (
    <Container>
      <Row>
        <Col sm={8} style={colStyle}>
          <div>
            <h1>Login to Your Account</h1>
            <hr />
            <Form onSubmit={handleUserSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  style={{ borderRadius: "35px" }}
                  type="email"
                  name="email"
                  placeholder="Enter email..."
                  value={loginDetails.email}
                  onChange={handleUserLogin}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  style={{ borderRadius: "35px" }}
                  type="password"
                  name="password"
                  placeholder="Enter Password...."
                  value={loginDetails.password}
                  onChange={handleUserLogin}
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
            <NavLink to={"/signup"}>
              {" "}
              <Button variant="light" style={{ borderRadius: "25px" }}>
                Sign Up
              </Button>
            </NavLink>
          </div>
        </Col>
      </Row>

      <ToastContainer />
    </Container>
  );
}

export default LoginPage;
