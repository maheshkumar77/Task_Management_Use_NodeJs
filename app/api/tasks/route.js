import connectDB from '../../lib/mongodb';
import Task from '../../models/Task';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    // Create a new task
    const { title, description, dueDate } = req.body;
    try {
      const newTask = new Task({
        title,
        description,
        dueDate,
        isCompleted: false,
      });
      const task = await newTask.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error creating task', error });
    }
  } else if (req.method === 'GET') {
    // Get all tasks
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', error });
    }
  } else {
    // Handle any other HTTP method (e.g., PUT, DELETE)
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
