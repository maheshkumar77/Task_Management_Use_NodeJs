import Image from "next/image";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function Home() {
  return (
    <>
      <TaskCard/>
      <TaskForm/>
      <TaskList/>
    </>
  );
}
