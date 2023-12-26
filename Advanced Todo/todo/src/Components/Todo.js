import React, { useState, useEffect, useRef } from 'react'
import TodoList from './TodoList'

const Todo = () => {

  const [isCompleteScreen, setIsCompleteScreen] = useState(false)
  // if false we are on a todo page & true means we are on a complete page
  const [allTodos, setAllTodos] = useState([])
  const [newTitle, setNewTitle] = useState("")

  const [completedTodo, setCompletedTodo] = useState([])

  const editInput = useRef()

  const handleAddTodo = () => {
    if (editInput.current.value === "") {
      alert("Please enter a task.")
    } else {
      let newTodoObject = {
        title: newTitle
      }

      let updatedTodoArr = [...allTodos]
      updatedTodoArr.push(newTodoObject);

      // console.log (updatedTodoArr);
      setAllTodos(updatedTodoArr);

      localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
      setNewTitle('');
    }

  }


  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));

    let saveCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))

    if (savedTodo) {
      setAllTodos(savedTodo);
    }

    if (saveCompletedTodo) {
      setCompletedTodo(saveCompletedTodo);
    }
  }, []);

  const handleDelete = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo))

    setAllTodos(reducedTodo)
  }

  const handleCompletedDelete = (index) => {
    let reducedCompletedTodo = [...completedTodo]
    reducedCompletedTodo.splice(index, 1);

    // console.log(reducedCompletedTodo);

    localStorage.setItem('completedTodos', JSON.stringify(reducedCompletedTodo))

    setCompletedTodo(reducedCompletedTodo)
  }

  const handleComplete = (index) => {
    let filteredItem = { ...allTodos[index] }

    console.log(filteredItem);
    console.log(index);

    let updatedCompletedArr = [...completedTodo, filteredItem];
    // spreading an array and pushing filteredItem
    console.log(updatedCompletedArr);
    setCompletedTodo(updatedCompletedArr)
    localStorage.setItem(
      'completedTodos',
      JSON.stringify(updatedCompletedArr)
    );
    handleDelete(index)
  }






  return (
    <>
      <div>
        <h1>My Todo App</h1>
        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-input-item">
              <label>Title</label>
              <input type="text" placeholder="What's the task?"
                ref={editInput}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>

            <div className="todo-input-item">
              <button type="button" className="primary-btn"
                onClick={handleAddTodo}
              >Add</button>
            </div>
          </div>

          <div className="btn-area">
            <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
              onClick={() => setIsCompleteScreen(false)}
            >Todo</button>
            <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
              onClick={() => setIsCompleteScreen(true)}
            >Completed</button>
          </div>

          <TodoList
            allTodos={allTodos}
            handleDelete={handleDelete}
            handleComplete={handleComplete}
            isCompleteScreen={isCompleteScreen}
            completedTodo={completedTodo}
            handleCompletedDelete={handleCompletedDelete}
          />
        </div>
      </div>
    </>
  )
}

export default Todo
