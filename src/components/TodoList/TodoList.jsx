import dayjs from 'dayjs';
import LocaizedFormat from 'dayjs/plugin/localizedFormat';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo, toggleTodo, editTodo } from '../../store/store';
import './TodoList.scss';

dayjs.extend(LocaizedFormat);

const TodoList = () => {
  const todos = useSelector(state => state);

  const todayDate = dayjs().startOf('D').unix();

  const uniqueDates = [
    ...new Set(todos.map(item => dayjs(item.expiration).startOf('D').unix())),
  ].sort((a, b) => a - b);

  const getTodosByDate = date =>
    todos.filter(todo => dayjs(todo.expiration).startOf('D').unix() === date);

  return (
    <div className="TodoList">
      {uniqueDates.map(uniqueDate => (
        <div className="TodoList__dateContainer" key={uniqueDate}>
          <h3 style={{ color: uniqueDate < todayDate ? 'red' : '' }}>
            {dayjs(uniqueDate * 1000).format('MMMM DD, ddd')}
          </h3>
          {getTodosByDate(uniqueDate).map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TodoList;

export const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <div className="TodoItem" key={todo.id}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo.id))}
        />
        <input
          value={todo.title}
          id={'title'}
          onChange={e =>
            dispatch(editTodo(todo.id, e.target.value, e.target.id))
          }
          className="title"
          style={{ textDecoration: todo.completed ? 'line-through' : '' }}
        />
        <input
          value={todo.desc}
          id={'desc'}
          onChange={e =>
            dispatch(editTodo(todo.id, e.target.value, e.target.id))
          }
          className="desc"
        />

        <div className="delete" onClick={() => dispatch(removeTodo(todo.id))}>
          ✕
        </div>
      </label>
    </div>
  );
};
