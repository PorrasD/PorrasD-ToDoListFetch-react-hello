import React, { useState } from 'react';


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

    return (
        <div>


            <ul className="list-group mt-4">
                {tasks_list.length === 0 ? (
                    <li className="list-group-item text-center text-muted">No hay tareas, añadir tareas</li>
                ) : (
                    tasks_list.map((task, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            {task}
                            {/* <Button
                                // variant="danger"
                                // size="sm"
                                onClick={() => deleteTask(index)}
                            // className="d-none d-md-inline-block"
                            // style={{ cursor: 'pointer' }}
                            >
                                Eliminar
                            </Button> */}
                        </li>
                    ))
                )}
            </ul>
            <input
                type="text"
                className="form-control"
                placeholder="Agregar una tarea..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={addTask}
            />
        </div>
    );
};

export default To_DoList;
