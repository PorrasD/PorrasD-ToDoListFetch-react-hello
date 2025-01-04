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
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${tasks_list}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error("Error");
            }
            setTasks([]);
        } catch (error) {
            console.error(error);
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
            <input type="text" id="user" placeholder="Add your username" onChange={(e) => setUserName(e.target.value)} />
            <button className="boton" onClick={handlerSearch}>Buscar</button>
            <input type="text" onChange={(e) => setTask(e.target.value)}
                value={task}
                onKeyDown={addTask}
                className='list-group-item-success'></input>
                            <button
                className="btn btn-danger mt-3"
                onClick={deleteAllTasks}
            >
                Delete All
            </button>
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
        </div>
    );
};

export default To_DoList;