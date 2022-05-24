import logo from './logo.svg';
import {useState} from "react";
import './App.css';
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

const App = () => {
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: '리액트의 기초 알아보기',
            checked: true
        },
        {
            id: 2,
            text: '컴포넌트 스타일링 해보기',
            checked: true
        },
        {
            id: 3,
            text: '일정 관리 앱 만들어 보기',
            checked: false
        }
    ]);

    return (
        <TodoTemplate>
            <TodoInsert/>
            <TodoList todos={todos}/> {/* TodoList에서 'todos'를 props로 받아 처리하게 한다. */}
        </TodoTemplate>
    )
}

export default App;
