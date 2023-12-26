import React from 'react'
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

const TodoList = ({ allTodos, handleDelete, handleComplete, isCompleteScreen, completedTodo, handleCompletedDelete }) => {
    return (
        <>
            <div className="todo-list">
                {isCompleteScreen === false && allTodos.map((item, index) => {
                    return (
                        <div className="todo-list-item" key={index}>
                            <div className="">
                                <h3>{item.title}</h3>
                            </div>
                            <div className="">
                         
                                <BsCheckLg className='check-icon' title="Complete?"
                                    onClick={() =>
                                        handleComplete(index)
                                    }
                                />
                                <AiOutlineDelete className='icon' title="Delete?"
                                    onClick={() =>
                                        handleDelete(index)
                                    }
                                />

                            </div>
                        </div>
                    )
                })
                }


                {isCompleteScreen === true && completedTodo.map((item, index) => {
                    return (
                        <div className="todo-list-item" key={index}>
                            <div className="">
                                <h3>{item.title}</h3>
                            </div>
                            <div className="">
                                <AiOutlineDelete className='icon' title="Delete?"
                                    onClick={() =>
                                        handleCompletedDelete(index)
                                    }
                                />
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </>
    )
}

export default TodoList