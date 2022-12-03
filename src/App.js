import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import AddForm from './AddForm';
import ToDo from './ToDo';

function App({ data }) {

  const [values, setValues] = useState(data);

  function toggleTaskCompleted(id) {
    const updatedTasks = values.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed }
      }
      return task;
    });
    setValues(updatedTasks);
  }

  function editTask(id, newName, newDueDate) {
    const editedTaskList = values.map((task) => {
      if (id === task.id) {
        return { ...task, task: newName }
      }
      return task;
    });
    setValues(editedTaskList);
  }

  const taskList = values.map((task) => <ToDo toDo={task} key={task.id} toggleTaskCompleted={toggleTaskCompleted} editTask={editTask}></ToDo>);

  const addTask = (newValue) => {
    const newTask = { id: values.length + 1, task: newValue.task, dueDate: newValue.dueDate, completed: false };
    setValues([...values, newTask]);
  };

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';

  const taskCount = `${taskList.length} ${tasksNoun} remaining: `;

  return (
    <div className='App'>
      <Header></Header>
      <AddForm addTask={addTask}></AddForm>
      <hr />
      <h4>{taskCount}</h4>
      <div className='d-flex justify-content-center mt-4'>
        <form>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Tasks</th>
                <th>Due Dates</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {taskList}
            </tbody>
          </table>
          </form>
      </div>
    </div>
  );
}
export default App;