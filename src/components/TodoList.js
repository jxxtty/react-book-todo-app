import React, {useCallback} from "react";
import TodoListItem from "./TodoListItem";
import {List} from "react-virtualized";
import './TodoList.scss';

// react-virtualized(라이브러리)를 사용한 렌더링 최적화 -> 사용 전에 npm add react-virtualized 해줘야함
// 첫 렌더링 시 TodoListItem이 9개까지만 보인다. 나머지 2491개 컴포넌트는 스크롤하기 전에는 보이지 않음에도 불구하고 렌더링이 일어나고있다.
// react-virtualized를 사용하면 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않고 크기만 차지하게끔 할 수 있다.
// 만약 스크롤이 되면 해당 스크롤 위치에서 보여 줘야할 컴포넌트들을 렌더링시킨다.

const TodoList = ({todos, onRemove, onToggle}) => { // props로 todos를 받는다, onRemove도 props로 받는다.

    const rowRenderer = useCallback(
        ({index, key, style}) => {
            const todo = todos[index];
            return (
                <TodoListItem todo={todo} key={key} onRemove={onRemove} onToggle={onToggle} style={style}/>
            );
        },
        [onRemove, onToggle, todos]
    );


    // return (
    //     <div className={"TodoList"}>
    //         {todos.map(todo => (
    //             <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}/> // TodoListItem에 props로 todo자체를 통째로 넘겨준다.
    //         ))}
    //     </div>
    // );

    return (
        <List
            className={"TodoList"}
            width={512} // 전체 크기
            height={513} // 전체 높이
            rowCount={todos.length} // 항목 개수
            rowHeight={57} // 항목 높이
            rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
            list={todos} // 배열
            style={{outline: 'none'}} // List에 기본 적용되는 outline 스타일 제거
        />
    );
}

export default TodoList