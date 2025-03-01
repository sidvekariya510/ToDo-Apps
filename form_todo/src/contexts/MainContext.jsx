import { createContext, useContext, useState } from "react";

const MainContext = createContext();

export const useMainContext = () => useContext(MainContext);

export const MainProvider = ({ children }) => {

    const initialObj = [{
        name: "Siddharth",
        age: "28",
        gender: "Male",
        hobbies: "Chess"
    }]

    const [groupData, setGroupData] = useState(initialObj)

    return (
        <MainContext.Provider value={{ groupData, setGroupData }}>
            {children}
        </MainContext.Provider>
    )
}