import { createSlice } from "@reduxjs/toolkit";

const getTasksFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

const setTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const deleteTaskFromLocalStorage = (taskId) => {
  const tasksStorage = getTasksFromLocalStorage();
  setTasksToLocalStorage(tasksStorage.filter((task) => task.id !== taskId));
};

const editTaskInLocalStorage = (taskId, changes) => {
  const tasksStorage = getTasksFromLocalStorage();
  setTasksToLocalStorage(
    tasksStorage.map((task) =>
      task.id === taskId ? { ...task, ...changes } : task,
    ),
  );
};

const toggleCompletionInLocalStorage = (taskId) => {
  const tasksStorage = getTasksFromLocalStorage();
  setTasksToLocalStorage(
    tasksStorage.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    ),
  );
};

const initialState = {
  tasks: getTasksFromLocalStorage(),
  priority: "All",
  searchQuery: "",
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setPriority: (state, action) => {
      state.priority = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addTask: (state, action) => {
      const tasksStorage = getTasksFromLocalStorage();
      setTasksToLocalStorage([action.payload, ...tasksStorage]);
      state.tasks.unshift(action.payload);
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      deleteTaskFromLocalStorage(taskId);
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    toggleTaskCompletion: (state, action) => {
      const taskId = action.payload;
      toggleCompletionInLocalStorage(taskId);
      state.tasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      );
    },
    editTask: (state, action) => {
      const { taskId, changes } = action.payload;
      editTaskInLocalStorage(taskId, changes);
      state.tasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...changes } : task,
      );
    },
  },
});

export const {
  setPriority,
  setSearchQuery,
  addTask,
  deleteTask,
  toggleTaskCompletion,
  editTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
