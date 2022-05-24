import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline
} from "react-icons/md";
import './TodoListItem.scss';
import cn from 'classnames'; // cn import

const TodoListItem = ({todo, onRemove, onToggle}) => { // props로 todo를 받는다.
    const {id, text, checked} = todo;
    return (
        <div className={"TodoListItem"}>
            <div className={cn('checkbox', {checked})} onClick={() => onToggle(id)}>
                {checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>} {/* checked여부에 따라 보여지는 것이 달라진다. */}
                <div className={"text"}>{text}</div>
            </div>

            <div className={"remove"} onClick={() => onRemove(id)}>
                <MdRemoveCircleOutline/>
            </div>
        </div>
    );
}

export default TodoListItem