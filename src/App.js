import { Route, Routes } from "react-router";
import "./App.css";
import TodoList from "./component/TodoList";
import LoginPage from "./fixedComponent/LoginPage";
import SignUpPage from "./fixedComponent/SignUpPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/user/:userId/todo" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
