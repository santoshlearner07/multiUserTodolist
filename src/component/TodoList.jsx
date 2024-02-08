import React, { useEffect, useState } from "react";
import DisplayTodo from "./DisplayTodo";
import { Box, Button, TextField } from "@mui/material";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";

// import { makeStyles } from "@material-ui/core/styles";

function TodoList() {
  const userDeleted = () => toast.success("User Deleted");
  const navigate = useNavigate();
  const { userId } = useParams();
  const tempUniqueTodoId = [];
  const [todoData, setTodoData] = useState({
    title: "",
    text: "",
    desc: "",
  });
  // const [disTodo, setDistodo] = useState([]);
  const [tempTodoList, setTempTodoList] = useState([]);

  function randomNumberInRange() {
    const uid = Math.floor(Math.random() * 100000000) + 1;
    return tempUniqueTodoId.push(uid);
  }

  const handleChangeTodo = (event) => {
    const { name, value } = event.target;
    setTodoData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    axios.get(`http://localhost:8888/users/${userId}`).then((res) => {
      setTempTodoList(res.data);
    });
  }, []);

  //Temporary solution
  const fetchdata = () => {
    axios.get(`http://localhost:8888/users/${userId}`).then((res) => {
      setTempTodoList(res.data);
    });
  };

  const handleTodoList = (e) => {
    randomNumberInRange();
    e.preventDefault();
    let newTodo = {
      userId: userId,
      todoId: tempUniqueTodoId[0],
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

  const deleteUser =()=>{
    axios.delete(`http://localhost:8888/users/${userId}`)
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
    axios.delete(`http://localhost:8888/todos/${userId}`)
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
    userDeleted();
    setTimeout(()=>{
      navigate('/signup')
    },3000)
  }

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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>{JSON.parse(localStorage.getItem("user"))}</h1>
        <h6 style={{cursor:"pointer"}} onClick={()=>deleteUser()} ><DeleteIcon /></h6>
      </div>
      <br />
      <h2>Todo List</h2>
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
      <ToastContainer />
    </Box>
  );
}

export default TodoList;
