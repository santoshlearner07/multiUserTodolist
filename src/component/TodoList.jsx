import React, { useState } from 'react'
import DisplayTodo from './DisplayTodo';

function TodoList() {

    const [todoData, setTodoData] = useState({
        title: "", title2: "", desc: ""
    })
    const [disTodo, setDistodo] = useState([]);

    const handleChangeTodo = (event) => {
        const { name, value } = event.target;
        setTodoData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleTodoList = (e) => {
        e.preventDefault();
        let newTodo = {
            title: todoData.title,
            title2: todoData.title2,
            desc: todoData.desc
        }

        let copyTodoArr = [...disTodo];
        copyTodoArr.push(newTodo);
        setDistodo(copyTodoArr);
    }

    return (
        <div>
            <h1>Todo List</h1>
            <form onSubmit={handleTodoList}>
                <input type="text" name="title" value={todoData.title} onChange={handleChangeTodo} />
                <input type="text" name="title2" value={todoData.title2} onChange={handleChangeTodo} />
                <input type="text" name="desc" value={todoData.desc} onChange={handleChangeTodo} />
                <input type="submit" value="Submit" />
            </form>
            <DisplayTodo data={disTodo} />
        </div>
    )
}

export default TodoList