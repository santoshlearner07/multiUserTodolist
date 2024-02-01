import React, { useState } from "react";
import DisplayTodo from "./DisplayTodo";
import { Box, Button, TextField } from "@mui/material";
// import { makeStyles } from "@material-ui/core/styles";

function TodoList() {
  // const useStyle = {
  //     textField:{
  //         margin:'2',
  //     }
  // }
  // const classes = useStyle();
  const [todoData, setTodoData] = useState({
    title: "",
    text: "",
    desc: "",
  });
  const [disTodo, setDistodo] = useState([]);

  const handleChangeTodo = (event) => {
    const { name, value } = event.target;
    setTodoData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTodoList = (e) => {
    e.preventDefault();
    let newTodo = {
      title: todoData.title,
      text: todoData.text,
      desc: todoData.desc,
    };
    console.log(todoData);
    let copyTodoArr = [...disTodo];
    copyTodoArr.push(newTodo);
    setDistodo(copyTodoArr);
    setTodoData({
      title: "",
      text: "",
      desc: "",
    });
  };

  return (
    <Box
      sx={{
        "& > :not(style)": {
          m: 1,
          width: "80%",
          marginLeft: "10%",
          maxHeight: "40vh",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <h1>Todo List</h1>
      <form onSubmit={handleTodoList}>
        <TextField
          fullWidth
          label="Title"
          variant="standard"
          name="title"
          value={todoData.title}
          onChange={handleChangeTodo}
        />
        <br />
        <TextField
          fullWidth
          label="Text"
          variant="standard"
          name="text"
          value={todoData.text}
          onChange={handleChangeTodo}
        />
        <br />
        <TextField
          fullWidth
          label="Description"
          variant="standard"
          name="desc"
          value={todoData.desc}
          onChange={handleChangeTodo}
        />
        <br />
        <Button
          variant="contained"
          color="success"
          type="submit"
          value="Submit"
        >
          Success
        </Button>
      </form>
      <DisplayTodo data={disTodo} />
    </Box>
  );
}

export default TodoList;
