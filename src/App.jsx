import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import ListHeader from "./components/ListHeader";
import ListBody from "./components/ListBody";
import TodoForm from "./components/TodoForm";
import { Info } from "./components/alerts/Info";
import { TODO_OPERATIONS } from "./operations";

const { GET_TODOS, ADD_TODO, TOGGLE_TODO } = TODO_OPERATIONS;

const App = () => {
  // set up hooks
  const [todoText, setTodoText] = useState("");
  const { data, loading, error } = useQuery(GET_TODOS);
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [addTodo] = useMutation(ADD_TODO, {
    onCompleted: () => setTodoText(""),
  });


  // Add / Toggle / Delete Functions
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!todoText.trim()) return;
    // gets new todo to render immediately, causes extra fetch!
    const data = await addTodo({
      variables: { text: todoText },
      refetchQueries: [{ query: GET_TODOS }],
    });

    // can set this in useMutation instead
    // setTodoText("");
  };

  const handleToggleTodo = async ({ id, done }) => {
    const data = await toggleTodo({ variables: { id: id, done: !done } });
    console.log(data);
  };

  // manipulating classes instead of using use/setState for no particular reason
  const handleInfoClose = () => {
    const info = document.getElementById("info");
    info.classList.remove("visible");
    info.classList.add("invisible");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching Todos!</div>;

  return (
    <div className="h-full">
      <Info handleInfoClose={handleInfoClose} />

      <div className="container h-90% mx-auto max-w-2xl text-center">
        <ListHeader />
        <TodoForm
          todoText={todoText}
          handleAddTodo={handleAddTodo}
          setTodoText={setTodoText}
        />
        <ListBody
          data={data}
          handleToggleTodo={handleToggleTodo}
        />
      </div>
    </div>
  );
};

export default App;
