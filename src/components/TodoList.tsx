import React from 'react';
import TodoItem from './TodoItem';

interface Props{

}

interface TodoItemData{
    id: number;
    text: string;
    done: boolean;
}
interface State{
    todoItems: TodoItemData[];
    input: string;
}

class TodoList extends React.Component<Props, State>{
    id: number=0;

    state: State ={
        todoItems: [],
        input: '',
    };
    onToggle = (id: number): void =>{
        const {todoItems} = this.state;
        const index = todoItems.findIndex(todo=>todo.id===id);
        const selectedItem = todoItems[index];
        const nextItems = [...todoItems];

        const nextItem = {
            ...selectedItem,
            done: !selectedItem.done
        };
        nextItems[index] = nextItem; //boolean값을 바꾸어준 아이템으로 바꾸어 저장

        this.setState({
            todoItems: nextItems
        });
    }

    onRemove =(id:number): void =>{
        this.setState(
            ({todoItems})=>({
                todoItems: todoItems.filter(todo => todo.id !==id)//id값이 일치하지 않는 경우만 저장
            })
        );
    }

    onChange = (e: React.FormEvent<HTMLInputElement>): void =>{
        const {value} = e.currentTarget;
        this.setState({
            input: value
        });
    }

    onSubmit = (e:React.FormEvent<HTMLFormElement>): void=>{
        e.preventDefault();//submit클릭 시 페이지 전환 제거

        this.setState(
            ({todoItems, input})=>({
                input: '',
                todoItems: todoItems.concat({//concat메소드는 인자로 주어진 값을 기존배열에 합쳐서 반환
                    id: this.id++,
                    text: input,
                    done: false
                })
            })
        );
    }

    render(){
        const { onSubmit, onChange, onToggle, onRemove} = this;
        const { input, todoItems} = this.state;

        const todoItemList = todoItems.map(
            todo=>(
                <TodoItem
                key={todo.id}
                done={todo.done}
                onToggle={()=>onToggle(todo.id)}
                onRemove={() => onRemove(todo.id)}
                text = {todo.text}
                />
            )
        );
        return(
            <div>
                <h1>오늘 할일</h1>
                <form onSubmit={onSubmit}>
                    <input onChange={onChange} value={input}/>
                    <button type="submit">추가하기</button>
                </form>
                <ul>
                    {todoItemList}
                </ul>
            </div>
        );
    }
}

export default TodoList;