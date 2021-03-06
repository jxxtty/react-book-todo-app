import logo from './logo.svg';
import {useState, useRef, useCallback} from "react";
import './App.css';
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

// 4. <<많은 데이터 렌더링 하기>>
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

const App = () => {
    // const [todos, setTodos] = useState([
    //     {
    //         id: 1,
    //         text: '리액트의 기초 알아보기',
    //         checked: true
    //     },
    //     {
    //         id: 2,
    //         text: '컴포넌트 스타일링 해보기',
    //         checked: true
    //     },
    //     {
    //         id: 3,
    //         text: '일정 관리 앱 만들어 보기',
    //         checked: false
    //     }
    // ]);

    const [todos, setTodos] = useState(createBulkTodos);
    // useState(createBulkTodos())로 적어주면 리렌더링될때마다 createBulkTodos가 호출되지만,
    // useState(createBulkTodos)처럼 파라미터를 함수 형태로 넣어주면 컴포넌트가 처음 렌더링 될 때만 createBulkTodos 함수가 실행된다.


    // 1. <<항목 추가>>
    // useState가 아닌 useRef로 관리하는 이유 -> id값은 렌더링되는 정보가 아니기 때문(화면에 보이지도 않고, 이 값이 변한다해서 컴포넌트가 리렌더링될 필요가 없음)
    const nextId = useRef(2501);

    const onInsert = useCallback(
        text => {
            const todo = {
                id: nextId.current,
                text,
                checked: false
            }
            setTodos(todos => todos.concat(todo)); // useState의 함수형 업데이트로 수정
            nextId.current += 1;
        },
        [] // 함수형 업데이트로 수정하면서 빈 배열을 넣어준다(원래는 [todos]였음) -> 최적화([todos]일때는 todos가 변할때마다 리렌더링됐음)
    );

    // 2. <<항목 삭제>>
    // filter함수를 이용해서 id로 항목 지우기
    const onRemove = useCallback(
        id => {
            setTodos(todos => todos.filter(todo => todo.id !== id)); // useState의 함수형 업데이트로 수정
        },
        [] // 함수형 업데이트로 수정하면서 빈 배열을 넣어준다(원래는 [todos]였음) -> 최적화([todos]일때는 todos가 변할때마다 리렌더링됐음)
    );

    // 3. <<항목 수정>>
    const onToggle = useCallback(
        id => {
            setTodos(
                // 객체의 checked값을 반전시켜준다. 불변성을 유지하면서 특정 배열 원소를 업데이트해야 할 때 map 함수를 사용하면 짧고 쉽게 작성가능하다.
                todos => todos.map(todo => todo.id === id ? {...todo, checked: !todo.checked} : todo) // useState의 함수형 업데이트로 수정
                // 원소하나만 수정하지만 map함수를 사용하는 이유
                // 삼항연산자로 조건을 넣어줬다. 즉, 'todo.id' 와 현재 파라미터로 사용된 'id' 값이 같을때는 우리가 정해준 규칙대로 새로운 객체를 생성하지만,
                // 다를때는 변화를 주지 않고 처음 받아왔던 상태 그대로 반환이 된다.
                // 즉, map을 사용하여 만든 배열에서 변화가 필요한 원소만 업데이트되고 나머지는 그대로 남아있게 되는 것이다.
            );
        },
        [] // 함수형 업데이트로 수정하면서 빈 배열을 넣어준다(원래는 [todos]였음) -> 최적화([todos]일때는 todos가 변할때마다 리렌더링됐음)
    );

    return (
        <TodoTemplate>
            <TodoInsert onInsert={onInsert}/>
            <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/> {/* TodoList에서 'todos', 'onRemove', 'onToggle'들을 props로 받아 처리하게 한다. */}
        </TodoTemplate>
    )
}

export default App;
