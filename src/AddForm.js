import React, { useState } from "react";

const AddForm = ({ addTask }) => {
  const initialValues = {
    task: "",
    dueDate: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    addTask({ ...values, [name]: value });
    setValues(initialValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex justify-content-center mt-3 row">
        <div className="col-md-2">Enter task:</div>
        <div className="col-md-3">
          <input
            type="text"
            name="task"
            value={values.task}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3 row">
        <div className="col-md-2">
          <label>Enter due date: </label>
        </div>
        <div className="col-md-3">
          <input
            type="date"
            name="dueDate"
            value={values.dueDate}
            onChange={handleChange}
            className="form-control"
          ></input>
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Add the task
      </button>
    </form>
  );
};

export default AddForm;
