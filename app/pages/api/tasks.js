import connectDB from '../../lib/mongodb';
import Task from '../../models/Task';

export default async function handler(req, res) {
  await connectDB();

  // Create Task
  if (req.method === 'POST') {
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
  }

  // Get All Tasks
  if (req.method === 'GET') {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', error });
    }
  }
}
