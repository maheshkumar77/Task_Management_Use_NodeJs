"use client";
import { useState } from 'react';
import axios from 'axios'; // Import axios

function TaskForm({ onCreate }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the task data using Axios
      const res = await axios.post('pages/task', task);
      const newTask = res.data; // The response will be available in res.data
      onCreate(newTask); // Pass the new task to the onCreate callback
      setTask({ title: '', description: '', dueDate: '' }); // Reset the form fields
    } catch (error) {
      console.error('Error creating task:', error); // Handle error if the request fails
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-lg rounded-md">
      <input
        type="text"
        className="w-full p-2 border rounded-md text-black"
        placeholder="Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <input
        type="text"
        className="w-full p-2 border rounded-md text-black"
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      <input
        type="date"
        className="w-full p-2 border rounded-md text-black"
        value={task.dueDate}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
      />
      <button className="w-full p-2 bg-blue-500 text-white rounded-md">Add Task</button>
    </form>
  );
}

export default TaskForm;
