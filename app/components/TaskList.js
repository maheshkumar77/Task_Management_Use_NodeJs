import TaskCard from './TaskCard';

function TaskList({ tasks, onDelete, onUpdate }) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
}

export default TaskList;
