import "./App.css";

import FilterBar from "./components/FilterBar/FilterBar";
import Header from "./components/layouts/Header";
import TaskInput from "./components/TaskInput/TaskInput";
import TaskList from "./components/TaskList/TaskList";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="app-container">
      <Header />

      <main>
        <TaskInput />
        <FilterBar />
        <TaskList />
      </main>

      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
