import { useEffect, useState } from "react";
import { Task } from "../types";
import AddTask from "./AddTask";

const Tasks = () => {
    const [taskName, setTaskName] = useState('');
    const [editId, setEditId] = useState<any>(null);

    const [tasksArr, setTaskArr] = useState<Task[]>([]);

    const onAddTask = (taskName: string) => {
        if (editId === null) {
            const data = [...tasksArr, {
                id: Date.now(),
                title: taskName,
                isCompleted: false,
            }];
            setTaskArr(data);
            localStorage.setItem('tasks', JSON.stringify(data));
        } else {
            const data = [...tasksArr];

            const updatedItem = data.map((item): Task => {
                if (item.id === editId) {
                    return {
                        id: editId,
                        title: taskName,
                        isCompleted: item.isCompleted
                    }
                } else {
                    return item;
                }
            })
            console.log('updatedItem', updatedItem)
            setTaskArr(updatedItem);
            localStorage.setItem('tasks', JSON.stringify(updatedItem));
            setEditId(null);
        }
    }

    const EditHandler = (task: Task) => {
        setTaskName(task.title);
        setEditId(task.id);
    }




    const DeleteHandler = (task: Task) => {
        const data = [...tasksArr];

        const restItems = data.filter((item) => {
            return item.id !== task.id;
        });

        setTaskArr(restItems);
        localStorage.setItem('tasks', JSON.stringify(restItems));
    }

    useEffect(() => {
        const storedArr: any = localStorage.getItem('tasks')
        const parsedArr = storedArr ? JSON.parse(storedArr) : []
        setTaskArr(parsedArr)
    }, [])


    return (
        <div style={{ textAlign: "center" }}>
            <h1>Tasks</h1>
            <AddTask taskName={taskName} setTaskName={setTaskName} onAddTask={onAddTask} editId={editId} />
            <ul>
                {
                    tasksArr?.map((task) =>
                        <li key={task.id} style={{ display: "flex", justifyContent: "space-between", width: "300px", border: "1px solid grey", padding: "5px" }} >
                            <span>{task.title}</span>
                            <div style={{ display: "flex", columnGap: "10px" }}>
                                <button style={{ padding: "5px" }} onClick={() => EditHandler(task)}>Edit</button>
                                <button style={{ padding: "5px" }} onClick={() => DeleteHandler(task)}>Delete</button>
                            </div>
                        </li >)
                }
            </ul >
        </div >
    )
}

export default Tasks