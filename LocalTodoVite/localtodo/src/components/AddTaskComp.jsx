import { Button, TextField, Grid2 as Grid } from "@mui/material";

import React from 'react'
import { useMainContext } from "../context/MainContext";

const AddTaskComp = (props) => {

    const { addTask } = props;

    const { taskName, setTaskName, editIndex } = useMainContext();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!taskName.trim()) {
            return;
        }
        addTask(taskName);
        setTaskName("")
    }
    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid>
                    <TextField
                        placeholder='Enter task here'
                        size="small"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </Grid>
                <Grid>
                    <Button type="submit" variant='contained' color='success'>{editIndex === null ? 'Add' : 'Update'}</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default AddTaskComp