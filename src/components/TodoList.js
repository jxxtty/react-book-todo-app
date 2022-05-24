import TodoListItem from "./TodoListItem";
import './TodoList.scss';

const TodoList = ({todos, onRemove, onToggle}) => { // props로 todos를 받는다, onRemove도 props로 받는다.
    return (
        <div className={"TodoList"}>
            {todos.map(todo => (
                <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}/> // TodoListItem에 props로 todo자체를 통째로 넘겨준다.
            ))}
        </div>
    );
}

export default TodoList