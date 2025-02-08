import connectDB from '../../../lib/mongodb';
import Task from '../../../models/Task';

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;

  if (req.method === 'PATCH') {
    const { title, description, dueDate, isCompleted } = req.body;

    try {
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title, description, dueDate, isCompleted },
        { new: true }
      );
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task', error });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const deletedTask = await Task.findByIdAndDelete(id);
      res.status(200).json({ message: 'Task deleted', task: deletedTask });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error });
    }
  }
}
