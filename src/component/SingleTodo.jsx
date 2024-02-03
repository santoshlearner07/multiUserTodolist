import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  InputGroup,
  Form,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function SingleTodo() {
  const todoDeleted = () => toast.success("Deleted");
  const todoEdited = () => toast.warning("Editing");
  const todoUpdated = () => toast.success("Updated");
  const { userId, todoId } = useParams();
  const navigate = useNavigate();

  const [singleTodoDetails, setSingleTodoDetails] = useState({
    title: "",
    subTitle: "",
    text: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:8888/users/${userId}/${todoId}`).then((res) => {
      setSingleTodoDetails({
        ...singleTodoDetails,
        title: res.data[0].title,
        subTitle: res.data[0].text,
        text: res.data[0].desc,
      });
    });
  }, []);

  const handleEditTodo = (event) => {
    const { name, value } = event.target;
    setSingleTodoDetails((prevData) => ({ ...prevData, [name]: value }));
    setInterval(() => {
      todoEdited();
    }, 5000);
  };

  const handleDeleteTodo = () => {
    axios
      .delete(`http://localhost:8888/todos/${userId}/${todoId}`)
      .then((res) => {
        todoDeleted();
      });
    setTimeout(() => {
      navigate(`/user/${userId}`);
    }, 2000);
  };

  const handleUpdateTodo = () => {
    const updatedTodo = {
      userId: userId,
      todoId: todoId,
      title: singleTodoDetails.title,
      text: singleTodoDetails.text,
      desc: singleTodoDetails.subTitle,
    };
    axios
      .put(`http://localhost:8888/todos/${userId}/${todoId}`, updatedTodo)
      .then((res) => {
        todoUpdated();
      });
    setTimeout(() => {
      navigate(`/user/${userId}`);
    }, 2000);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "black",
      }}
    >
      <Row style={{ width: "40%", height: "40vh" }}>
        <Col className="mb-4">
          <Card
            style={{
              padding: "5px",
              width: "100%",
              height: "40vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <InputGroup>
              <Form.Control
                placeholder="Title"
                aria-describedby="basic-addon1"
                name="title"
                value={singleTodoDetails.title}
                onChange={handleEditTodo}
              />
              <Form.Control
                placeholder="Sub-Title"
                aria-describedby="basic-addon1"
                name="subTitle"
                value={singleTodoDetails.subTitle}
                onChange={handleEditTodo}
              />
              <Form.Control
                placeholder="Text"
                aria-describedby="basic-addon1"
                name="text"
                value={singleTodoDetails.text}
                onChange={handleEditTodo}
              />
            </InputGroup>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button variant="danger" onClick={() => handleDeleteTodo()}>
                Delete
              </Button>
              <Button variant="warning" onClick={() => handleUpdateTodo()}>
                Edit
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
}

export default SingleTodo;
