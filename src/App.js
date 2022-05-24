import logo from './logo.svg';
import {useState, useRef, useCallback} from "react";
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

    // useState가 아닌 useRef로 관리하는 이유 -> id값은 렌더링되는 정보가 아니기 때문(화면에 보이지도 않고, 이 값이 변한다해서 컴포넌트가 리렌더링될 필요가 없음)
    const nextId = useRef(4);

    const onInsert = useCallback(
        text => {
            const todo = {
                id: nextId.current,
                text,
                checked: false
            }
            setTodos(todos.concat(todo));
            nextId.current += 1;
        },
        [todos]
    );

    return (
        <TodoTemplate>
            <TodoInsert onInsert={onInsert}/>
            <TodoList todos={todos}/> {/* TodoList에서 'todos'를 props로 받아 처리하게 한다. */}
        </TodoTemplate>
    )
}

export default App;
