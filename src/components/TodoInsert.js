import './TodoInsert.scss'
import {MdAdd} from "react-icons/md";
import {useState, useCallback} from "react"; // useState, useCallback import

const TodoInsert = ({onInsert}) => {
    const [value, setValue] = useState('');

    const onChange = useCallback(event => { // 함수를 한번 만들고 재사용할 수 있도록 useCallback 사용
        setValue(event.target.value);
    }, []);

    const onSubmit = useCallback(
        event => {
            onInsert(value);
            setValue('');

            event.preventDefault(); // submit 이벤트는 브라우저에서 새로고침을 유발한다 -> event.preventDefault를 사용하면 이를 방지해준다.
        },
        [onInsert, value]
    );

    return (
        <form className={"TodoInsert"} onSubmit={onSubmit}>
            <input placeholder={"할 일을 입력하세요"} value={value} onChange={onChange} />
            <button type={"submit"}>
                <MdAdd/>
            </button>
        </form>
    );
}

export default TodoInsert