import React from 'react'

const CompletedTasks = ({ completedItem, updateItem, deleteItem }) => {
    return (
        <div className='col-6 text-center mt-3'>
            <h3 className='text-center'>Completed Tasks</h3>

            {
                completedItem.map((data, index, value) => {
                    return (
                        <>
                            <table className='table table-hover border border-1 text-warning w-50'>
                                <tr className='d-flex justify-content-center align-items-center p-1' >

                                    {/* index starts from 0 so we added (+1) to use it as a serial Number*/}
                                    <td className='text-start px-3 text-warning' key={index}>{index + 1}</td>

                                    <td className='text-start px-3 text-warning fw-light w-75' key={index}>{data.taskname}</td>
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
    )
}

export default CompletedTasks