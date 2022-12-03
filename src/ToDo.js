import React, {useState} from 'react';
import './App.css';

function ToDo({toDo, toggleTaskCompleted}) {

    const [isEditing, setEditing] = useState(false);

    const viewTemplate = (
        <tr>
            <td><input id={toDo.id} type="checkbox" className='bigCheckBox' onChange={()=> toggleTaskCompleted(toDo.id)}></input></td>
            <td>{toDo.task}</td>
            <td>{toDo.dueDate}</td>
            <td><button type="button" className='btn btn-info' onClick={() => setEditing(true)}>Edit</button></td>
            <td><button type="button" className='btn btn-danger'>Delete</button></td>
        </tr>
    );

    const editingTemplate = (
        <tr>
            <td></td>
            <td><input id={toDo.id} type="text" placeholder={toDo.task}></input></td>
            <td><input type="date" placeholder={toDo.dueDate}/></td>
            <td><button type="submit" className='btn btn-info'>Save</button></td>
            <td><button type="button" className='btn btn-secondary' onClick={() => setEditing(false)}>Cancel</button></td>
        </tr>
    );

    return isEditing? editingTemplate: viewTemplate;
}

export default ToDo;