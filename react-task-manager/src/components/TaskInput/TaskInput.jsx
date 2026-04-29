import "./taskInput.css";

import { Plus } from "lucide-react";
import { addTask } from "../../redux/tasksSlice/tasksSlice.js";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useState } from "react";

const TaskInput = () => {
  const [task, setTask] = useState({ title: "", priority: "Medium" });
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleAddTask = (event) => {
    event.preventDefault();
    if (!task.title.trim()) {
      setError(true);
      return;
    }

    dispatch(
      addTask({
        ...task,
        title: task.title.trim(),
        id: Date.now(),
        completed: false,
      }),
    );
    toast.success("Task added successfully!");
    setTask({ title: "", priority: "Medium" });
    setError(false);
  };

  return (
    <>
      <form className="task-input-wrapper" onSubmit={handleAddTask}>
        <input
          type="text"
          className="input-field"
          placeholder="What needs to be done?"
          value={task.title}
          onChange={(e) => {
            setError(false);
            setTask({ ...task, title: e.target.value });
          }}
        />
        <select
          className="priority-select"
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button className="add-btn" type="submit">
          <Plus size={20} color="currentColor" />
          Add Task
        </button>
      </form>

      {error && <div className="error-text">Please write the task first!</div>}
    </>
  );
};

export default TaskInput;
