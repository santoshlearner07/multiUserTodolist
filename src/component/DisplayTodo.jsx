import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function DisplayTodo(props) {
  let displayTodoItem = props.data;
  return (
    <Container>
      <h1>Display Todo</h1>
      <Row sm={1} md={3} lg={4}>
        {displayTodoItem.map((item, index) => {
          return (
            <Col key={index} className="mb-4">
              <Card>
                <Card.Title>{item.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {item.text}
                </Card.Subtitle>
                <Card.Text>{item.desc}</Card.Text>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default DisplayTodo;
