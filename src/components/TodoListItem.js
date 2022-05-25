import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline
} from "react-icons/md";
import './TodoListItem.scss';
import cn from 'classnames'; // cn import
import React from "react";

const TodoListItem = ({todo, onRemove, onToggle, style}) => { // props로 todo를 받는다.
    const {id, text, checked} = todo;
    return (
        <div className={"TodoListItem-virtualized"} style={style}> {/* virtualized 적용 후 스타일 설정을 위해 div로 전체를 다시 감쌌다. */}
            <div className={"TodoListItem"}>
                <div className={cn('checkbox', {checked})} onClick={() => onToggle(id)}>
                    {checked ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>} {/* checked여부에 따라 보여지는 것이 달라진다. */}
                    <div className={"text"}>{text}</div>
                </div>

                <div className={"remove"} onClick={() => onRemove(id)}>
                    <MdRemoveCircleOutline/>
                </div>
            </div>
        </div>
    );
}

export default React.memo(TodoListItem) // React.memo로 감싸준다 -> TodoListItem 컴포넌트는 todo, onRemove, onToggle이 바뀌지않으면 리렌더링 하지 않는다.