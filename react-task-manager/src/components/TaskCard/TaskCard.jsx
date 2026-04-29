import "./taskCard.css";

import { Check, SquarePen, Trash2 } from "lucide-react";
import {
  deleteTask,
  editTask,
  toggleTaskCompletion,
} from "../../redux/tasksSlice/tasksSlice";

import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useState } from "react";

const TaskCard = ({ title, priority, completed, id }) => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editPriority, setEditPriority] = useState(priority);

  const getPriorityClass = (priorityLevel) => {
    switch (priorityLevel.toLowerCase()) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "priority-medium";
    }
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(id));
    toast.success("Task Deleted Successfully!");
  };

  const handleToggleCompletion = () => {
    dispatch(toggleTaskCompletion(id));
  };

  const handleToggleEdit = () => {
    if (!isEditing) {
      setEditTitle(title);
      setEditPriority(priority);
    }
    setIsEditing((prev) => !prev);
  };

  const handleSave = () => {
    const trimmed = editTitle.trim();
    if (!trimmed) {
      toast.error("Task title cannot be empty!");
      return;
    }
    dispatch(
      editTask({
        taskId: id,
        changes: { title: trimmed, priority: editPriority },
      }),
    );
    toast.success("Task Updated Successfully!");
    setIsEditing(false);
  };

  return (
    <div
      className={`task-card${isEditing ? " editing" : " clickable"}`}
      onClick={!isEditing ? handleToggleCompletion : undefined}
    >
      {!isEditing && (
        <div className="task-checkbox-wrapper">
          <input
            type="checkbox"
            className="task-checkbox"
            checked={completed}
            onChange={handleToggleCompletion}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="task-content">
        {!isEditing ? (
          <h3 className={`task-title ${completed ? "completed" : ""}`}>
            {title}
          </h3>
        ) : (
          <input
            type="text"
            name="task-modify"
            id={`task-modify-${id}`}
            className="input-field editing"
            placeholder="Modify The Task..."
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        )}

        {!isEditing ? (
          <div className="task-badges">
            <span className={`priority-badge ${getPriorityClass(priority)}`}>
              {priority}
            </span>
          </div>
        ) : (
          <div className="priority-radio-group">
            {["High", "Medium", "Low"].map((level) => (
              <label
                key={level}
                className={`priority-radio-label priority-radio-${level.toLowerCase()}${editPriority === level ? " selected" : ""}`}
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="radio"
                  name={`priority-${id}`}
                  value={level}
                  checked={editPriority === level}
                  onChange={() => setEditPriority(level)}
                  className="priority-radio-input"
                />
                <span className="priority-radio-dot" />
                {level}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="task-actions">
        <button
          className={`action-btn ${isEditing ? "save" : "edit"}`}
          aria-label={isEditing ? "Save task" : "Edit task"}
          onClick={(e) => {
            e.stopPropagation();
            isEditing ? handleSave() : handleToggleEdit();
          }}
        >
          {isEditing ? (
            <Check size={18} color="currentColor" />
          ) : (
            <SquarePen size={18} color="currentColor" />
          )}
        </button>
        <button
          className="action-btn delete"
          aria-label="Delete task"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteTask();
          }}
        >
          <Trash2 size={18} color="currentColor" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
