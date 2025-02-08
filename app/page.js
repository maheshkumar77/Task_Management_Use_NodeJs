"use client"
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks using Axios
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/api/tasks'); // Use axios to fetch tasks
        setTasks(res.data); // Axios response data is in res.data
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleCreateTask = async (newTask) => {
    try {
      const res = await axios.post('/api/tasks', newTask); // Use axios to create a task
      setTasks((prevTasks) => [...prevTasks, res.data]); // Add the new task to the state
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`); // Use axios to delete a task
      setTasks(tasks.filter((task) => task._id !== id)); // Remove the deleted task from the state
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const res = await axios.put(`/api/anotask/${updatedTask._id}`, updatedTask); // Use axios to update a task
      setTasks(
        tasks.map((task) => (task._id === updatedTask._id ? res.data : task))
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        <h1 className="text-4xl font-bold text-center text-blue-400">Task Manager</h1>
        <TaskForm onCreate={handleCreateTask} />
        <TaskList tasks={tasks} onDelete={handleDeleteTask} onUpdate={handleUpdateTask} />
      </div>
    </div>
  );
}
