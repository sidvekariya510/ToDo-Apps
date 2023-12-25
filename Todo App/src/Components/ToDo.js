import React, { useState, useEffect, useRef } from 'react'
import './Style.css'
import axios from 'axios'

const ToDo = () => {
    const input = useRef('')

    const [item, setItem] = useState([])

    const [editId, setEditId] = useState(null)

    useEffect(() => {
        getItem()
    }, [])


    const getItem = () => {
        axios.get(`http://localhost:8002/items`).then((response) => {
            setItem(response.data)
            console.log(response.data);
        })
    }
    const addItem = () => {
        if (editId == null) {
            if (input.current.value == '') {
                alert("Please fill the data.")
            } else {
                axios.post("http://localhost:8002/items",
                    { taskname: input.current.value })
                    .then(() => {
                        getItem()
                        input.current.value = ''
                    })
            }
        }
        else {
            axios.put(`http://localhost:8002/items/${editId}`,
                { taskname: input.current.value })
                .then(() => {
                    getItem()
                    input.current.value = ''
                    setEditId(null) //to change the functioning of btn from update to add.
                })
        }

  
    }

    const deleteItem = (id) => {
        axios.delete(`http://localhost:8002/items/${id}`).then(() => {
            console.log(id);
            getItem()
        })
    }

    const updateItem = (id) => {
        let editData = item.filter((response) => {
            return response.id == id
        })

        input.current.value = editData[0].taskname;
        setEditId(editData[0].id)
    }

    return (
        <>
            <div>
                <div className='container-fluid'>
                    <div className="container">
                        <div className="h1 text-center m-5">
                            <i class="fa-solid fa-list-check"></i>&nbsp; ToDo App</div>
                        <div className="mt-4 text-center">
                            <input className='w-50' ref={input} type="text" placeholder='Enter Task Name' />
                        </div>
                        <div className='text-center m-3'>
                            <button className='btn' onClick={() => {
                                addItem()
                            }}>Add Task</button>
                        </div>
                    </div>
                </div>

                <div className='w-100'>
                    {

                        item.map((data, index) => {
                            return (
                                <>
                                    <table className='table table-hover border border-1 text-warning w-50'>
                                        <tr className='d-flex justify-content-center align-items-center p-1' >

                                            {/* index starts from 0 so we added (+1) to use it as a serial Number*/}
                                            <td className='text-start px-3 text-light' >{index + 1}</td>

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
            </div>
        </>
    )
}

export default ToDo