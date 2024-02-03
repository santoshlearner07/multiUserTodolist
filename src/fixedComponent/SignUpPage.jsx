import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import ImgTodolist from "../assesst/ImgTodolist.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
function SignUpPage() {
  const userCreated = () => toast.success("User Created!");
  const userExist = () => toast.warning("User Exist!");
  const colStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [userList, setUserList] = useState([]);
  const [checkUser, setCheckUser] = useState([]);

  const handleCreateUser = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    axios.get("http://localhost:8888/users").then((res) => {
      setUserList(res.data);
    });
  }, []);
  const addUser = () => {
    userList.map((item) => {
      return checkUser.push(item.email);
    });
    if (checkUser.indexOf(userDetails.email) > -1) {
      userExist();
      setUserDetails({
        name: "",
        email: "",
        password: "",
      });
    } else {
      const userData = {
        userId: userList.length + 1,
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
      };
      axios.post("http://localhost:8888/users", userData).then((res) => {
        console.log(res.status, res);
        userCreated();
      });
      setUserDetails({
        name: "",
        email: "",
        password: "",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();
    addUser();
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
            <p style={{ fontSize: "50px", fontWeight: "bold" }}>
              Welcome to TodoList!
            </p>
            <h3> Register Your Account. </h3>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                {" "}
                <PersonIcon />{" "}
              </InputGroup.Text>
              <Form.Control
                placeholder="Username"
                aria-describedby="basic-addon1"
                name="name"
                value={userDetails.name}
                onChange={handleCreateUser}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                {" "}
                <EmailIcon />{" "}
              </InputGroup.Text>
              <Form.Control
                placeholder="Email"
                aria-describedby="basic-addon1"
                name="email"
                value={userDetails.email}
                onChange={handleCreateUser}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                {" "}
                <KeyIcon />{" "}
              </InputGroup.Text>
              <Form.Control
                placeholder="Password"
                type="password"
                name="password"
                value={userDetails.password}
                onChange={handleCreateUser}
              />
            </InputGroup>

            <ButtonGroup aria-label="Basic example" className="mb-3">
              {userDetails.name && userDetails.email && userDetails.password ? (
                <Button
                  variant="success"
                  type="submit"
                  onClick={handleSubmitUser}
                >
                  Submit
                </Button>
              ) : (
                <Button variant="warning" type="submit" disabled>
                  Submit
                </Button>
              )}
            </ButtonGroup>
            <div>
              <h6 className="mb-3">
                Already a User ? <NavLink to={"/"}>SignIn</NavLink>
              </h6>
            </div>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default SignUpPage;
