import React, {useState} from 'react';
import './App.css';

function ToDo(props) {

    const [isEditing, setEditing] = useState(false);

    const initialValues = {
        task: '',
        dueDate: '',
    };

    const [values, setValues] = useState(initialValues);

    const handleChange = (e) => {
        const {name, value} = e.target();
        setValues({...values, [name]: value});
    }

    const viewTemplate = (
        <tr>
            <td><input id={props.id} type="checkbox" className='bigCheckBox' onChange={()=> props.toggleTaskCompleted(props.id)}></input></td>
            <td>{props.task}</td>
            <td>{props.dueDate}</td>
            <td><button type="button" className='btn btn-info' onClick={() => setEditing(true)}>Edit</button></td>
            <td><button type="button" className='btn btn-danger'>Delete</button></td>
        </tr>
    );

    const editingTemplate = (
        <tr>
            <td></td>
            <td>
                <form id="edit-form" onSubmit={(e) => {
                    e.preventDefault();
                    props.editTask(props.id, values.task, values.dueDate);
                }}>
                <input name="task" id="task" type="text" defaultValue={props.task} onChange={handleChange}></input></form></td>
            <td><input form="edit-form" id="dueDate" type="date" name="dueDate" defaultValue={props.dueDate} onChange={handleChange}></input></td>
            <td><button form="edit-form" type="submit" className='btn btn-info' onClick={() => document.querySelector("#edit-form").submit()}>Save</button></td>
            <td><button form="edit-form" type="button" className='btn btn-secondary' onClick={() => setEditing(false)}>Cancel</button></td>
        </tr>
    );

    return isEditing? editingTemplate: viewTemplate;
}

export default ToDo;