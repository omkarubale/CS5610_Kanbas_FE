import Classes from "./Classes";
import Styles from "./Styles";
import JavaScript from "./JavaScript";
import Add from "./routing/Add";
import PathParameters from "./routing/PathParameters";
import ConditionalOutput from "./ConditionalOutput";
import Highlight from "./Highlight";
import TodoList from "./todos/TodoList";
import { useSelector } from "react-redux";
import { LabState } from "../store";

function Assignment3() {
  const { todos } = useSelector((state: LabState) => state.todosReducer);

  return (
    <div className="container">
      <h1>Assignment 3</h1>
      <JavaScript />
      <PathParameters />
      <Classes />
      <Styles />
      <ConditionalOutput />
      <Highlight>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga corrupti
        non cumque hic quas officia aliquid nesciunt maxime labore, tempore
        inventore sed explicabo facilis magni perferendis illum. Pariatur, quae
        ipsam?
      </Highlight>
      <TodoList />

      <ul className="list-group">
        {todos.map((todo) => (
          <li className="list-group-item" key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Assignment3;
