import './App.css';
import DisplayTodo from './component/DisplayTodo';
import TodoList from './component/TodoList';
import LoginPage from './fixedComponent/LoginPage';
import SignUpPage from './fixedComponent/SignUpPage';

function App() {
  return (
    <div className="App">
      <SignUpPage />
      {/* <LoginPage /> */}
      {/* <TodoList /> */}
    </div>
  );
}

export default App;
