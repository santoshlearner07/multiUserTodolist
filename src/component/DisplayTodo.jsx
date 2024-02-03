import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function DisplayTodo(props) {
  const userId = useParams();
  const navigate = useNavigate();
  const [displayTodoItem, setDisplayTodoItem] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8888/users/${userId.userId}`).then((res) => {
      setDisplayTodoItem(res.data);
    });
  }, [displayTodoItem]);

  const handleSingleTodo = (data, index) => {
    navigate(`/user/${data.userId}/${data.todoId}`)
  };

  return (
    <Container>
      <h1>Display Todo</h1>
      <Row sm={1} md={3} lg={4}>
        {displayTodoItem.map((item, index) => {
          return (
            <Col key={index} className="mb-4">
              <Card
                style={{ padding: "5px",cursor:"pointer" }}
                onClick={()=>handleSingleTodo(item, index)}
                               
              >
                <Card.Title>{item.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {item.text}
                </Card.Subtitle>
                <Card.Text>{item.desc}</Card.Text>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default DisplayTodo;
