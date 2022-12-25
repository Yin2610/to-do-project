import React, { useState } from "react";
import "./App.css";

function ToDo(props) {
  const [isEditing, setEditing] = useState(false);

  const initialValues = {
    task: "",
    dueDate: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const viewTemplate = (
    <tr>
      <td>
        <input
          id={props.id}
          type="checkbox"
          className="bigCheckBox"
          checked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        ></input>
      </td>
      <td>{props.task}</td>
      <td>{props.dueDate}</td>
      <td>
        <button
          type="button"
          className="btn btn-info"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            props.deleteTask(props.id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );

  const editingTemplate = (
    <tr>
      <td></td>
      <td>
        <input
          name="task"
          id="task"
          type="text"
          defaultValue={props.task}
          onChange={handleChange}
        ></input>
      </td>
      <td>
        <input
          id="dueDate"
          type="date"
          name="dueDate"
          defaultValue={props.dueDate}
          onChange={handleChange}
        ></input>
      </td>
      <td>
        <button
          type="submit"
          className="btn btn-info"
          onClick={() => {
            props.editTask(
              props.id,
              document.querySelector("#task").value,
              document.querySelector("#dueDate").value
            );
            setEditing(false);
          }}
        >
          Save
        </button>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setEditing(false)}
        >
          Cancel
        </button>
      </td>
    </tr>
  );

  return isEditing ? editingTemplate : viewTemplate;
}

export default ToDo;
