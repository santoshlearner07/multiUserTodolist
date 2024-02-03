import React, { useEffect, useState } from "react";
import DisplayTodo from "./DisplayTodo";
import { Box, Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { makeStyles } from "@material-ui/core/styles";

function TodoList() {

  const { userId } = useParams();

  const [todoData, setTodoData] = useState({
    title: "",
    text: "",
    desc: "",
  });
  // const [disTodo, setDistodo] = useState([]);
  const [tempTodoList,setTempTodoList] = useState([]);


  const handleChangeTodo = (event) => {
    const { name, value } = event.target;
    setTodoData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(()=>{
    axios.get(`http://localhost:8888/users/${userId}`)
    .then((res)=>{
      setTempTodoList(res.data)
    })
  },[])

  //Temporary solution
  const fetchdata=()=>{
    axios.get(`http://localhost:8888/users/${userId}`)
    .then((res)=>{
      setTempTodoList(res.data)
    })
  }

  const handleTodoList = (e) => {
    e.preventDefault();
    let newTodo = {
      userId: userId,
      todoId: tempTodoList.length + 1,
      title: todoData.title,
      text: todoData.text,
      desc: todoData.desc,
    };
    axios.post("http://localhost:8888/todos", newTodo).then((res) => {
      console.log(res.status, res);
    });
    fetchdata();
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
      {/* <DisplayTodo data={tempTodoList} /> */}
      <DisplayTodo />

    </Box>
  );
}

export default TodoList;
