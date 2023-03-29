import { createContext, useState, useEffect } from "react";
import { format } from "date-fns";

export const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])
    const [currentTaskPage, setCurrentTaskPage] = useState()

    // Get tasks from localstorage for today
    useEffect(() => {
        getTasks(new Date())
    }, [])

    const addTask = (name, date, isCompleted) => {
        if (localStorage.getItem(format(date, 'Y-M-d'))) {
            const dayTasks = JSON.parse(localStorage.getItem(format(date, 'Y-M-d')))
            localStorage.setItem(format(date, 'Y-M-d'), JSON.stringify([...dayTasks, { name, date, isCompleted }]))
            return
        }
        setTasks(prev => [...prev, { name, date, isCompleted }])
        localStorage.setItem(format(date, 'Y-M-d'), JSON.stringify([{ name, date, isCompleted }]))
    }

    const getTasks = (date) => {
        const dayTasks = localStorage.getItem(format(date, 'Y-M-d'))
        if (dayTasks) {
            setTasks(JSON.parse(dayTasks))
        }
    }

    const openTaskPage = () => {

    }

    return <TaskContext.Provider value={{ tasks, addTask, getTasks, currentTaskPage, setCurrentTaskPage }}>
        {children}
    </TaskContext.Provider>
}