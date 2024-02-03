import { Route, Routes } from "react-router";
import "./App.css";
import TodoList from "./component/TodoList";
import LoginPage from "./fixedComponent/LoginPage";
import SignUpPage from "./fixedComponent/SignUpPage";
import SingleTodo from "./component/SingleTodo";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/user/:userId" element={<TodoList />} />
        <Route path="/user/:userId/:todoId" element={<SingleTodo />} />
      </Routes>
    </div>
  );
}

export default App;
