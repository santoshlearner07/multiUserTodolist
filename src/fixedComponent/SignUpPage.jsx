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
import PinIcon from "@mui/icons-material/Pin";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ImgTodolist from "../assesst/ImgTodolist.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
function SignUpPage() {
  const userCreated = () => toast.success("User Created!");
  const userExist = () => toast.warning("User Exist!");
  const otpIncorrect = () => toast.dark("OTP incorrect!");

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
    otp: "",
  });

  const name = userDetails.name;
  const email = userDetails.email;
  const password = userDetails.password;

  const [userList, setUserList] = useState([]);
  const [checkUser, setCheckUser] = useState([]);
  const [show, hide] = useState(false);
  const [vOtp, setVOtp] = useState(false);
  const [vpassword, setVpassword] = useState(false);

  const tempUniqueNumb = [];

  const handleCreateUser = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const showPass = () => {
    hide(!show);
  };

  const showOtp = () => {
    userList.map((item) => {
      return checkUser.push(item.email, item.userId);
    });
    if (checkUser.indexOf(userDetails.email) > -1) {
      userExist();
      setUserDetails({
        name: "",
        email: "",
      });
    } else {
      const userData = {
        name: userDetails.name,
        email: userDetails.email,
      };
      axios
        .post("http://localhost:8888/handleotp",userData)
        .then((res) => {
          setCheckUser(res.data.otp);
        })
        .catch((err) => {
          console.log(err);
        });
      setVOtp(!vOtp);
    }
  };

  const checkOTP = () => {
    if(userDetails.otp == checkUser){
      setVpassword(!vpassword);
    } else {
      otpIncorrect();
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8888/users").then((res) => {
      setUserList(res.data);
    });
  }, []);

  function randomNumberInRange() {
    const uid = Math.floor(Math.random() * 1000000) + 1;
    return tempUniqueNumb.push(uid);
  }

  const addUser = () => {
    randomNumberInRange();
    const userData = {
      userId: tempUniqueNumb[0],
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password,
    };
    axios.post("http://localhost:8888/users", userData).then((res) => {
      // console.log(res.status, res);
      userCreated();
    });
    setUserDetails({
      name: "",
      email: "",
      password: "",
      otp: "",
    });
    setTimeout(() => {
      navigate("/");
    }, 2000);
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

            {vOtp ? (
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  {" "}
                  <PinIcon />{" "}
                </InputGroup.Text>
                <Form.Control
                  placeholder="Enter OTP"
                  type="text"
                  name="otp"
                  value={userDetails.otp}
                  onChange={handleCreateUser}
                />
              </InputGroup>
            ) : (
              ""
            )}

            {vpassword ? (
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  {" "}
                  <KeyIcon />{" "}
                </InputGroup.Text>
                <Form.Control
                  placeholder="Password"
                  type={show ? "text" : "password"}
                  name="password"
                  value={userDetails.password}
                  onChange={handleCreateUser}
                />
                <InputGroup.Text id="basic-addon1">
                  {" "}
                  <div onClick={showPass}>
                    {show ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
                </InputGroup.Text>
              </InputGroup>
            ) : (
              ""
            )}

            <ButtonGroup aria-label="Basic example" className="mb-3">
              {!vOtp ? (
                <Button onClick={() => showOtp()} disabled={!(name && email)}>
                  Send Email
                </Button>
              ) : (
                <div>
                  {" "}
                  {!vpassword ? (
                    <Button onClick={() => checkOTP()}>Check OTP</Button>
                  ) : (
                    <Button
                      variant="success"
                      type="submit"
                      onClick={handleSubmitUser}
                    >
                      Submit
                    </Button>
                  )}
                </div>
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
