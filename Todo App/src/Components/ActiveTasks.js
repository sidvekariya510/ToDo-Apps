import React from 'react'

const ActiveTasks = ({ activeItem, deleteItem }) => {
    return (
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
    )
}

export default ActiveTasks