import React, { useState } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

const To_DoList = () => {
    const [task, setTask] = useState('');
    const [tasks_list, setTasks] = useState([]);

    const addTask = (e) => {
        if (e.key === 'Enter') {
            setTasks([...tasks_list, task]);
            setTask('');
        }
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks_list.filter((_, item) => item !== index);
        setTasks(updatedTasks);
    };

    const handleMouseOver = (e) => {
        const button = e.currentTarget.querySelector('button');
        button.style.display = 'inline-block';
    };

    const handleMouseOut = (e) => {
        const button = e.currentTarget.querySelector('button');
        button.style.display = 'none';
    };

    return (
        <div>
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
                            {task}
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