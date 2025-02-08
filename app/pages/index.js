import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleCreateTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        <h1 className="text-4xl font-bold text-center">Task Manager</h1>
        <TaskForm onCreate={handleCreateTask} />
        <TaskList tasks={tasks} onDelete={handleDeleteTask} onUpdate={handleUpdateTask} />
      </div>
    </div>
  );
}
