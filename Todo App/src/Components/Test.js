import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import "./Style.css"

const Test = () => {
    const input = useRef("")

    // main array where all of the tasks will be stored
    const [item, setItem] = useState([])

    // storing id in another state for update function
    const [editId, setEditId] = useState(null)

    // storing values of completed items as "true" in check state
    const [check, setCheck] = useState(false)

    // storing completed tasks in saperate array
    const [completedItem, setCompletedItem] = useState([])

    // storing active tasks in saperate array
    const [activeItem, setActiveItem] = useState([])




    useEffect(() => {
        getItem()
    }, [])

    // function for getting data from json file via json server
    const getItem = () => {
        axios.get(`http://localhost:8002/items`).then((response) => {
            setItem(response.data)
            console.log(response.data);
        })
    }

    const addItem = () => {
        if (editId == null) {
            if (input.current.value == "") {
                alert("Please fill the data.")
            } else {
                axios.post(`http://localhost:8002/items`, { taskname: input.current.value, completed: false }).then(() => {
                    getItem()
                    input.current.value = ""
                })
            }
        } else {
            axios.put(`http://localhost:8002/items/${editId}`, { taskname: input.current.value, completed: false }).then(() => {
                getItem()
                input.current.value = ""
                setEditId(null)
                document.getElementById("addTaskBtn").innerHTML = "Add Task"
            })
        }
    }
    // received (data.id) as (id), which we passed in button onclick event 
    const deleteItem = (id) => {
        axios.delete(`http://localhost:8002/items/${id}`).then(() => {
            console.log(id);
            getItem()
        })
    }

    const updateItem = (id) => {
        let editData = item.filter((res) => {
            return res.id == id
        })
        console.log(editData);

        input.current.value = editData[0].taskname
        setEditId(editData[0].id)
        console.log(editId);
        document.getElementById("addTaskBtn").innerHTML = "Update Task"
    }

    // setting value as "true" in button checked tasks
    const statusChange = (id) => {
        let editCheck = item.filter((res) => {
            return res.id == id
        })
        // console.log(editCheck);
        setCheck(editCheck[0].completed = true)
        // console.log(check);
        console.log(item);
        input.current.value = editCheck[0].taskname

        axios.put(`http://localhost:8002/items/${id}`, { taskname: input.current.value, completed: check }).then(() => {
            getItem()
            input.current.value = ""
        })
    }

    // filtered and stored completed tasks on json file
    const completedTask = () => {
        let filteredItem = item.filter((res) => {
            return (
                res.completed == true
            )
        })
        // console.log(filteredItem);
        // setCompletedItem(filteredItem);
        // console.log(completedItem);

        axios.post(`http://localhost:8002/completedItems`, { taskname: input.current.value, completed: true }).then(() => {
            axios.get(`http://localhost:8002/completedItems`).then(() => {
                setCompletedItem(filteredItem);
            })
        })
    }

    // filtered and stored active tasks 
    const active = () => {
        let activeItem = item.filter((res) => {
            return (
                res.completed == false
            )
        })

        axios.post(`http://localhost:8002/activeItem`, { taskname: input.current.value, completed: false }).then(() => {
            axios.get(`http://localhost:8002/activeItem`).then(() => {
                setActiveItem(activeItem);
            })
        })
    }
    return (
        <>
            <div>
                <div className='container-fluid'>
                    <div className="container">
                        <div className="h1 text-center m-5 text-light">
                            <i class="fa-solid fa-list-check"></i>&nbsp; ToDo App</div>
                        <div className="mt-4 text-center">
                            <input ref={input} className='w-50' type="text" placeholder='Enter Task Name' />
                        </div>
                        <div className='text-center m-3'>
                            <button id='addTaskBtn' className='btn'
                                onClick={() => {
                                    addItem()
                                }}
                            >Add Task</button>
                        </div>
                    </div>
                </div>

                <div className='w-100'>
                    <h3 className='text-center'>All Tasks</h3>
                    {
                        item.map((data, index, value) => {
                            return (
                                <>
                                    <table className='table table-hover border border-1 text-warning w-50'>
                                        <tr className='d-flex justify-content-center align-items-center p-1' >

                                            {/* index starts from 0 so we added (+1) to use it as a serial Number*/}
                                            <td className='text-start px-3 text-warning' >{index + 1}</td>

                                            <td className='text-start px-3 text-warning fw-light w-75'>{data.taskname}</td>
                                            <td className='px-3'>
                                                <button onClick={() => {
                                                    statusChange(data.id)
                                                }} className='btn'>
                                                    <i class="fa-solid fa-circle-check"></i>
                                                </button>
                                            </td>
                                            <td className='text-end'>
                                                <button className="btn text-center me-2"
                                                    onClick={() => {
                                                        updateItem(data.id)
                                                    }}>
                                                    <i className="fa-regular fa-pen-to-square p-1" title='Edit Task'></i>
                                                </button>
                                            </td>
                                            <td className='text-end '>
                                                <button className='btn ms-2'
                                                    onClick={() => {
                                                        deleteItem(data.id)
                                                    }}>
                                                    <i className="fa-solid fa-trash p-1" title='Delete Task'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </table>
                                </>
                            )
                        })
                    }
                </div>


                {/* Completed Task starts from here */}
                <div className='container text-center mt-4'>
                    <button
                        onClick={() => {
                            completedTask()
                        }}
                        className='btn text-center w-25 me-2'>Completed</button>
                    <button
                        onClick={() => {
                            active()
                        }}
                        className='btn text-center w-25 me-2'>Active</button>
                </div>
                <div className="row">

                    <div className='col-6 text-center mt-3'>
                        <h3 className='text-center'>Completed Tasks</h3>

                        {
                            completedItem.map((data, index, value) => {
                                return (
                                    <>
                                        <table className='table table-hover border border-1 text-warning w-50'>
                                            <tr className='d-flex justify-content-center align-items-center p-1' >

                                                {/* index starts from 0 so we added (+1) to use it as a serial Number*/}
                                                <td className='text-start px-3 text-warning' >{index + 1}</td>

                                                <td className='text-start px-3 text-warning fw-light w-75'>{data.taskname}</td>
                                                <td className='text-end'>
                                                    <button className="btn text-center me-2"
                                                        onClick={() => {
                                                            updateItem(data.id)
                                                        }}>
                                                        <i className="fa-regular fa-pen-to-square p-1" title='Edit Task'></i>
                                                    </button>
                                                </td>
                                                <td className='text-end '>
                                                    <button className='btn ms-2'
                                                        onClick={() => {
                                                            deleteItem(data.id)
                                                        }}>
                                                        <i className="fa-solid fa-trash p-1" title='Delete Task'></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </table>
                                    </>
                                )
                            })
                        }
                    </div>



                    <div className='col-6 text-center mt-3'>
                        <h3 className='text-center'>Active Tasks</h3>

                        {
                            activeItem.map((data, index, value) => {
                                return (
                                    <>
                                        <table className='table table-hover border border-1 text-warning w-50'>
                                            <tr className='d-flex justify-content-center align-items-center p-1' >

                                                {/* index starts from 0 so we added (+1) to use it as a serial Number*/}
                                                <td className='text-start px-3 text-warning' >{index + 1}</td>

                                                <td className='text-start px-3 text-warning fw-light w-75'>{data.taskname}</td>
                                                <td className='text-end '>
                                                    <button className='btn ms-2'
                                                        onClick={() => {
                                                            deleteItem(data.id)
                                                        }}>
                                                        <i className="fa-solid fa-trash p-1" title='Delete Task'></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </table>
                                    </>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default Test