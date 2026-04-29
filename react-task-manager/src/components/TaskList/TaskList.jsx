import "./taskList.css";

import TaskCard from "../TaskCard/TaskCard";
import { useSelector } from "react-redux";

const TaskList = () => {
  const { tasks, priority, searchQuery } = useSelector((state) => state.tasks);

  const filteredTasks = tasks
    .filter(
      (task) =>
        task.priority.toLowerCase() === priority.toLowerCase() ||
        priority.toLowerCase() === "all",
    )
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <div className="task-list">
      {filteredTasks && filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            priority={task.priority}
            completed={task.completed}
            status={task.status}
            id={task.id}
          />
        ))
      ) : (
        <div className="task-empty">No Tasks Available</div>
      )}
    </div>
  );
};

export default TaskList;
