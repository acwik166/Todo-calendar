import { createContext, useState, useEffect } from "react";
import { format } from "date-fns";
import { v4 as uuidv4 } from 'uuid';

export const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])
    const [currentPageDate, setCurrentPageDate] = useState()

    // Get tasks from localstorage for today
    useEffect(() => {
        getTasks(new Date())
        setCurrentPageDate(new Date())
    }, [])

    const addTask = (name, date) => {
        if (localStorage.getItem(format(date, 'Y-M-d'))) {
            const dayTasks = JSON.parse(localStorage.getItem(format(date, 'Y-M-d')))
            localStorage.setItem(format(date, 'Y-M-d'), JSON.stringify([...dayTasks, { id: uuidv4(), name, date }]))
            setTasks(prev => [...prev, { id: uuidv4(), name, date }])
            return
        }
        setTasks(prev => {
            if (prev) {
                return [...prev, { id: uuidv4(), name, date }]
            } else {
                return [{ id: uuidv4(), name, date }]
            }
        })
        localStorage.setItem(format(date, 'Y-M-d'), JSON.stringify([{ id: uuidv4(), name, date, }]))
    }

    const removeTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id))
        const todos = JSON.parse(localStorage.getItem(format(currentPageDate, 'Y-M-d')))
        if (todos) {
            const filteredTodos = todos.filter(todo => todo.id !== id)
            localStorage.setItem(format(currentPageDate, 'Y-M-d'), JSON.stringify(filteredTodos))
        }
    }

    const getTasks = (date) => {
        const dayTasks = localStorage.getItem(format(date, 'Y-M-d'))
        if (dayTasks) {
            setTasks(JSON.parse(dayTasks))
        } else {
            setTasks(null)
        }
    }

    return <TaskContext.Provider value={{ tasks, addTask, getTasks, currentPageDate, setCurrentPageDate, removeTask }}>
        {children}
    </TaskContext.Provider>
}