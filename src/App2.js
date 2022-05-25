// App.js의 성능최적화 코드를 useReducer로 수정한 코드
// useState의 함수형 업데이트를 사용하거나, useReducer을 사용하거나 성능상은 거의 비슷하다. 취향껏 선택해서 사용하면된다.
// useReducer를 사용하는 경우 상태를 업데이트하는 로직을 모아서 컴포넌트 바깥에 둘 수 있다는 장점이 있다.
import {useReducer, useRef, useCallback} from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

function createBulkTodos() {
    const array = [];
    for (let i = 1; i <= 2500; i++) {
        array.push({
            id: i,
            text: `할 일 ${i}`,
            checked: false
        });
    }
    return array;
}

function todoReducer(todos, action) {
    switch (action.type) {
        case 'INSERT' :
            // {type: 'INSERT', todo: {id: 1, text: 'todo', checked: false}}
            return todos.concat(action.todo);
        case 'REMOVE' :
            // {type: 'REMOVE', id: 1}
            return todos.filter(todo => todo.id !== action.id);
        case 'TOGGLE' :
            // {type: 'TOGGLE', id: 1}
            return todos.map(todo => todos.id === action.id ? {...todo, checked: !todo.checked} : todo);
        default :
            return todos;
    }
}

const App2 = () => {
    const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

    // 고유값으로 사용될 id
    const nextId = useRef(2501);

    const onInsert = useCallback(text => {
        const todo = {
            id: nextId.current,
            text,
            checked: false
        }
        dispatch({type: 'INSERT', todo});
        nextId.current += 1;
    }, []);

    const onRemove = useCallback(id => {
        dispatch({type: 'REMOVE', id});
    }, []);

    const onToggle = useCallback(id => {
        dispatch({type: 'TOGGLE', id});
    }, []);

    return (
        <TodoTemplate>
            <TodoInsert onInsert={onInsert}/>
            <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
        </TodoTemplate>
    );
}

export default App2
