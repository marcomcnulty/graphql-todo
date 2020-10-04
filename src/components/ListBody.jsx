import React, { Fragment } from "react";
import { Warning } from "./alerts/Warning";
import { DeleteConfirmation } from "./alerts/DeleteConfirmation";
import { TODO_OPERATIONS } from "../operations";
import { useMutation } from "@apollo/react-hooks";

const { GET_TODOS, DELETE_TODO } = TODO_OPERATIONS;

const ListBody = ({ handleToggleTodo, data, handleAlertClose }) => {
  const [showWarning, setShowWarning] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [todoPendingDeletion, setTodoPendingDeletion] = React.useState(null);

  const alertTimeout = (type) => {
    const timeout = setTimeout(() => {
      type === "warning" ? setShowWarning(false) : setShowDelete(false);
    }, 5000);

    return () => clearTimeout(timeout);
  };

  const handleDeleteTodoClick = ({ id }) => {
    setTodoPendingDeletion(id);
    setShowWarning(true);
    alertTimeout("warning");
  }

  const handleDeleteTodo = async () => {
    const id = todoPendingDeletion
    const data = await deleteTodo({
      variables: { id },
      update: (cache) => {
        const prevData = cache.readQuery({ query: GET_TODOS });
        const newTodos = prevData.todos.filter((todo) => todo.id !== id);
        cache.writeQuery({ query: GET_TODOS, data: { todos: newTodos } });
      },
    });
    setShowWarning(false);
    setShowDelete(true);
    alertTimeout("delete");
    setTodoPendingDeletion(null);
    console.log(data);
  };

  return (
    <Fragment>
      <div className="h-75% border-2 mt-10">
        <ul className="text-2xl p-5">
          {data.todos.map((todo) => (
            <li className="flex items-center justify-center" key={todo.id}>
              <p onDoubleClick={() => handleToggleTodo(todo)}>
                <span className={` ${todo.done && "strike"}`}>{todo.text}</span>
              </p>
              <button onClick={() => handleDeleteTodoClick(todo)}>
                <svg
                  className="fill-current text-red-500 h-8 w-8 pt-1 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Warning
          showWarning={showWarning}
          setShowWarning={setShowWarning}
          handleDeleteTodo={handleDeleteTodo}
          todoPendingDeletion={todoPendingDeletion}
        />
        <DeleteConfirmation
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          handleAlertClose={handleAlertClose}
        />
      </div>
    </Fragment>
  );
};

export default ListBody;
