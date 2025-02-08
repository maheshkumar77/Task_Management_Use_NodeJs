function TaskCard({ task, onDelete, onUpdate }) {
    const handleDelete = () => {
      onDelete(task._id);
    };
  
    const handleToggleCompletion = async () => {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: !task.isCompleted }),
      });
      const updatedTask = await res.json();
      onUpdate(updatedTask);
    };
  
    return (
      <div className="p-4 bg-white shadow-md rounded-md flex justify-between items-center">
        <div>
          <h3 className={`text-lg font-bold ${task.isCompleted ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
          <p>{task.description}</p>
          <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
        </div>
        <div className="flex space-x-2">
          <button onClick={handleToggleCompletion} className="bg-yellow-500 text-white p-2 rounded-md">
            {task.isCompleted ? 'Undo' : 'Complete'}
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded-md">
            Delete
          </button>
        </div>
      </div>
    );
  }
  
  export default TaskCard;
  