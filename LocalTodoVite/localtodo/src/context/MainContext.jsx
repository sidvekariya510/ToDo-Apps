
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const MainContext = createContext();

export const useMainContext = () => useContext(MainContext);

export const MainProvider = ({ children }) => {
    const [taskName, setTaskName] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    return (
        <MainContext.Provider value={{
            taskName,
            setTaskName,
            taskList,
            setTaskList,
            editIndex,
            setEditIndex
        }}>
            {children}
        </MainContext.Provider>
    )
}