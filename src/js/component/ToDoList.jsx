import React from 'react';

const ToDoList = () => {
  const [task, setTask] = useState('');
  const [tasks_list, setTasks] = useState([]);
  
  // Función para agregar una tarea
  const addTask = (e) => {
    if (e.key === 'Enter' && task.trim() !== '') {
      setTasks([...tasks_list, task]);
      setTask(''); // Limpiar el campo de entrada
    }
  };

  // Función para eliminar una tarea
  const deleteTask = (index) => {
    const updatedTasks = tasks_list.filter((_, item) => item !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      {/* Campo de texto para agregar tareas */}
      <input
        type="text"
        className="form-control"
        placeholder="Agregar una tarea..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={addTask}  // Detecta cuando el usuario presiona Enter
      />

      {/* Lista de tareas */}
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
              <Button
                variant="danger"
                size="sm"
                onClick={() => deleteTask(index)}
                className="d-none d-md-inline-block"
                style={{ cursor: 'pointer' }}
              >
                Eliminar
              </Button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ToDoList;
