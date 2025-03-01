
const AddTask = ({ taskName, setTaskName, onAddTask, editId }: any) => {

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!taskName.trim()) {
            return;
        }

        onAddTask(taskName);

        setTaskName("");
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", width: "100%", padding: "15px" }}>
            <input style={{ padding: "5px" }} placeholder="Enter Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
            <button style={{ padding: "5px" }}>{editId === null ? 'Add' : 'Update'}</button>
        </form>
    )
}

export default AddTask;