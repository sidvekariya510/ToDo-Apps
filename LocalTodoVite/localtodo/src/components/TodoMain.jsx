import { useEffect, useState } from "react"
import AddTask from "./AddTaskComp"
import { Grid2 as Grid, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMainContext } from "../context/MainContext";

const TodoMain = () => {


    const { taskName, setTaskName, taskList, setTaskList, editIndex, setEditIndex } = useMainContext();



    // add logic
    const addTask = (taskName) => {

        if (editIndex === null) {
            const newTask = [...taskList, {
                id: Date.now(),
                title: taskName,
                time: new Date().toLocaleString()
            }]

            setTaskList(newTask);
            localStorage.setItem('tasklist', JSON.stringify(newTask));
        } else {
            updateTask();
            setEditIndex(null);
        }
    }



    const updateTask = () => {
        const data = [...taskList];

        const updatedArr = data.map((item) => {
            if (editIndex === item.id) {
                return {
                    id: item.id,
                    title: taskName,
                    time: item.time
                }
            } else {
                return item;
            }
        })

        setTaskList(updatedArr);
        localStorage.setItem('tasklist', JSON.stringify(updatedArr));
    }


    const handleEdit = (item) => {
        setEditIndex(item.id)
        setTaskName(item.title)
    }

    const handleDelete = (item) => {
        const restItems = taskList.filter((task) => {
            return item.id !== task.id
        })

        setTaskList(restItems);
        localStorage.setItem('tasklist', JSON.stringify(restItems));
    }

    useEffect(() => {
        const localData = localStorage.getItem('tasklist')
        const parsedData = JSON.parse(localData);
        if (parsedData) {
            setTaskList(parsedData);
        } else {
            setTaskList([])
        }
        setEditIndex(null);
    }, [])

    return (
        <Grid container display={"flex"} flexDirection={'column'}>
            <Grid>
                <AddTask addTask={addTask} />
            </Grid>
            <Grid>
                <Stack marginTop={2}>
                    {
                        taskList?.map((item, index) =>
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid lightgrey', padding: '5px' }}>
                                <Typography variant="subtitle2" paddingLeft={1}>
                                    {index + 1}) :  {item.title} - {item.time}
                                </Typography>
                                <div>
                                    <IconButton onClick={() => handleEdit(item)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(item)} >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </div>
                        )
                    }
                </Stack>
            </Grid>
        </Grid>
    )
}

export default TodoMain