import React, { useState, useMemo } from "react";
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
  const [search, setSearch] = useState("");
  const [isSearching, setSearching] = useState(false);

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

  const taskList = useMemo(() => {
    if (isSearching) {
      const regex = new RegExp(".*" + search + ".*", "gi");
      var searchList = [];
      for (let index = 0; index < values.length; index++) {
        if (values[index].task.match(regex) !== null) {
          searchList = [
            ...searchList,
            <ToDo
              id={values[index].id}
              task={values[index].task}
              dueDate={values[index].dueDate}
              completed={values[index].completed}
              key={values[index].id}
              toggleTaskCompleted={toggleTaskCompleted}
              editTask={editTask}
              deleteTask={deleteTask}
            ></ToDo>,
          ];
        }
      }
      return searchList;
    } else {
      return values
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
    }
  }, [search, values, filter]);

  function selectOne(name) {
    const filterBtnGrp = document.querySelectorAll(".filterBtn");
    for (const filterBtn of filterBtnGrp) {
      if (filterBtn.id === name) {
        filterBtn.classList.add("active");
      } else {
        filterBtn.classList.remove("active");
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
      setSearching={setSearching}
    />
  ));

  const handleChange = (e) => {
    setSearch(e.target.value);
    setSearching(true);
  };

  const addTask = (newValue) => {
    const newTask = {
      id: values.length + 1,
      task: newValue.task,
      dueDate: newValue.dueDate,
      completed: false,
    };
    setValues([...values, newTask]);
  };

  const taskVerb =
    isSearching === true
      ? "found"
      : filter === "All"
      ? "in total"
      : filter === "Active"
      ? "remaining"
      : "done";

  const tasksNoun =
    taskList.length !== 0 && taskList.length !== 1 ? "tasks" : "task";

  const taskCount = `${taskList.length} ${tasksNoun} ${taskVerb}: `;

  return (
    <div className="App">
      <Header></Header>
      <AddForm addTask={addTask}></AddForm>
      <hr />
      {filterList}
      <div className="d-flex justify-content-center row">
        <div className="col-md-2">
          <h5>{taskCount}</h5>
        </div>
        <div className="d-flex justify-content-center row mt-2">
          <div className="col-md-2">
            <input
              type="search"
              id="search"
              className="form-control"
              placeholder="Search task"
              value={search}
              onChange={handleChange}
            ></input>
          </div>
        </div>
      </div>
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
