import dayjs from 'dayjs';
import './NewTodo.scss';
// store
import { useDispatch } from 'react-redux';
import { addTodo } from '../../store/store';

const NewTodo = () => {
  const dispatch = useDispatch();

  const todayDate = dayjs().startOf('D').format('YYYY-MM-DD');

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(
      addTodo(
        event.target.title.value,
        event.target.desc.value,
        event.target.date.value
      )
    );
    event.target.reset();
  };

  return (
    <div className="NewTodo">
      <form className="NewTodo__form" onSubmit={handleSubmit}>
        <input
          className="title"
          type="text"
          name="title"
          id=""
          placeholder="Untitled"
        />
        <input type="text" name="desc" placeholder="Add some details" />
        <input
          type="date"
          name="date"
          defaultValue={todayDate}
          className="date"
        />
        <button>save</button>
      </form>
    </div>
  );
};

export default NewTodo;
