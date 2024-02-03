import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function SingleTodo() {
  const todoDeleted = () => toast.success("Deleted");
  const { userId, todoId } = useParams();
  console.log(userId, todoId);
  const navigate = useNavigate();
  const [singleDetails, setSingleDetails] = useState();

  useEffect(() => {
    axios.get(`http://localhost:8888/users/${userId}/${todoId}`).then((res) => {
      setSingleDetails(res.data);
    });
  }, []);

  const handleDeleteTodo = () => {
    axios
      .delete(`http://localhost:8888/todos/${userId}/${todoId}`)
      .then((res) => {
        todoDeleted();
      });
    setTimeout(() => {
      navigate(`/user/${userId}`);
    }, 2000);
    console.log("Clicked");
  };

  console.log(singleDetails);
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
        {singleDetails &&
          singleDetails.map((item, index) => {
            return (
              <Col key={index} className="mb-4">
                <Card style={{ padding: "5px", width: "100%", height: "40vh",display:'flex',flexDirection:"column",justifyContent:"space-around" }}>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.text}-{item.userId}-{item.todoId}
                  </Card.Subtitle>
                  <Card.Text>{item.desc}</Card.Text>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Button variant="danger" onClick={() => handleDeleteTodo()}>
                      Delete
                    </Button>
                    <Button variant="warning">Edit</Button>
                  </div>
                </Card>
              </Col>
            );
          })}
      </Row>
      <ToastContainer />
    </div>
  );
}

export default SingleTodo;
