import React, { useState, useEffect } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

const To_DoList = () => {
    const [task, setTask] = useState('');
    const [tasks_list, setTasks] = useState([]);

    const [userName, setUserName] = useState("mariajara929");
    const [turn, setTurn] = useState(false)

    const addTask = async (e) => {
        try {
            if (e.key === 'Enter') {
                let payload = {
                    "label": task,
                    "is_done": false
                }
                const response = await fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                if (!response.ok) {
                    throw new Error(":(");
                }
                let data = await response.json();
                setTasks([...tasks_list, data]);
                setTask('');
            }
        } catch (error) {

        }

    };

    const deleteTask = (index) => {
        const updatedTasks = tasks_list.filter((_, item) => item !== index);
        setTasks(updatedTasks);
    };

    const deleteAllTasks = async () => {
        try {
            await Promise.all(
                tasks_list.map(async (task) => {
                    const response = await fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    if (!response.ok) {
                        throw new Error(`Error al borrar tarea con ID: ${task.id}`);
                    }
                })
            );
            setTasks([]); // Vaciar la lista local después de eliminar todas las tareas
        } catch (error) {
            console.error("Error al borrar todas las tareas:", error);
        }
    };

    const handleMouseOver = (e) => {
        const button = e.currentTarget.querySelector('button');
        button.style.display = 'inline-block';
    };

    const handleMouseOut = (e) => {
        const button = e.currentTarget.querySelector('button');
        button.style.display = 'none';
    };

    const handlerGetList = async () => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/users/${userName}`)
            if (!response.ok) {
                throw new Error(":(");
            }
            let data = await response.json();
            setTasks(data.todos)
        } catch (error) {
            console.error(error)
        }
    }
    const handlerSearch = async () => {
        try {
            if (userName.length < 2) {
                alert("Not valid, Try again")
                return
            }
            setTurn(prev => !prev)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        handlerGetList();
    }, [turn]);

    return (
        <div>
            <div class="input-group mb-3">
                <button class="btn btn-outline-secondary" type="button" className="boton" onClick={handlerSearch}>Search</button>
                <input type="text" class="form-control" id="user" placeholder="Add your username" onChange={(e) => setUserName(e.target.value)} />
            </div>

            <div class="row">
                <div class="col-12">
                <input type="text" onChange={(e) => setTask(e.target.value)}
                        value={task}
                        placeholder="Add a new task"
                        onKeyDown={addTask}
                        className='form-control justify-content-between align-items-center list-group-item-success'></input>
                </div>
            </div>

            <ul className="list-group mt-4">
                {tasks_list.length === 0 ? (
                    <li className="list-group-item text-center text-muted">No tasks, add your task here!</li>
                ) : (
                    tasks_list.map((task, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            onMouseOver={handleMouseOver}
                            onMouseOut={handleMouseOut}
                        >
                            {task.label}
                            <button
                                onClick={() => deleteTask(index)}
                                style={{ display: 'none', cursor: 'pointer' }}
                            >
                                <HiOutlineXMark />
                            </button>
                        </li>
                    ))
                )}
            </ul>
            <input
                type="text"
                className="form-control"
                placeholder="Add your task..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={addTask}
            />
            <button
                        className="btn btn-danger mt-3"
                        onClick={deleteAllTasks}
                    >
                        Delete All
                    </button>
        </div>
    );
};

export default To_DoList;