import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import AddForm from "./AddForm";
import FilterButton from "./FilterButton";
import ToDo from "./ToDo";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App({ data }) {
  const [values, setValues] = useState(data);
  const [filter, setFilter] = useState("All");

  function toggleTaskCompleted(id) {
    const updatedTasks = values.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setValues(updatedTasks);
  }

  function editTask(id, newName, newDueDate) {
    const editedTaskList = values.map((task) => {
      if (id === task.id) {
        return { ...task, task: newName, dueDate: newDueDate };
      }
      return task;
    });
    setValues(editedTaskList);
  }

  function deleteTask(id) {
    const editedTaskList = values.filter((task) => {
      return id !== task.id;
    });
    setValues(editedTaskList);
  }

  const taskList = values
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <ToDo
        id={task.id}
        task={task.task}
        dueDate={task.dueDate}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        editTask={editTask}
        deleteTask={deleteTask}
      ></ToDo>
    ));

  function selectOne(name) {
    const filterBtnGrp = document.querySelectorAll(".filterBtn");
    for (const filterBtn of filterBtnGrp) {
      if (filterBtn.id !== name) {
        filterBtn.ariaPressed = false;
        alert(filterBtn.ariaPressed);
      }
    }
  }

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      selectOne={selectOne}
      setFilter={setFilter}
    />
  ));

  const addTask = (newValue) => {
    const newTask = {
      id: values.length + 1,
      task: newValue.task,
      dueDate: newValue.dueDate,
      completed: false,
    };
    setValues([...values, newTask]);
  };

  const tasksNoun =
    taskList.length !== 0 && taskList.length !== 1 ? "tasks" : "task";

  const taskVerb =
    filter == "All" ? "in total" : filter == "Active" ? "remaining" : "done";

  const taskCount = `${taskList.length} ${tasksNoun} ${taskVerb}: `;

  return (
    <div className="App">
      <Header></Header>
      <AddForm addTask={addTask}></AddForm>
      <hr />
      {filterList}
      <h4>{taskCount}</h4>
      <div className="d-flex justify-content-center mt-4">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Tasks</th>
              <th>Due Dates</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>{taskList}</tbody>
        </table>
      </div>
    </div>
  );
}
export default App;
