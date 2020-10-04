import React, { Fragment } from "react";

const TodoForm = ({ handleAddTodo, setTodoText, todoText }) => {
  return (
    <Fragment>
      <form onSubmit={handleAddTodo} className="text-2xl">
        <input
          onChange={(e) => setTodoText(e.target.value)}
          className="border-double rounded border-4 border-gray-400 px-2 m-1"
          type="text"
          value={todoText}
          placeholder="Write your todo..."
        />
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 py-3/4 px-4 border rounded border-gray-400 shadow"
          type="submit"
        >
          Create
        </button>
      </form>
    </Fragment>
  );
};

export default TodoForm;
