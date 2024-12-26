import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleComplete, deleteTodo, editTodo } from './redux/TodoSlice';

const TodoItem = ({ id, title, completed }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const handleCheckboxClick = () => {
        dispatch(toggleComplete({ id, completed: !completed }));
    };

    const handleDeleteClick = () => {
        dispatch(deleteTodo({ id }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        dispatch(editTodo({ id, title: newTitle }));
        setIsEditing(false); 
    };

    const handleCancelClick = () => {
        setNewTitle(title); 
        setIsEditing(false);
    };

   

    return (
        <li className={`list-group-item ${completed && 'list-group-item-success'}`}>
            <div className="d-flex justify-content-between">
                <span className="d-flex align-items-center">
                    <input
                        className="mr-3"
                        type="checkbox"
                        name="checkbox"
                        onChange={handleCheckboxClick}
                        checked={completed}
                    />
                    {isEditing ? (
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="form-control"
                        />
                    ) : (
                        title
                    )}
                </span>
                {isEditing ? (
                    <div>
                        <button onClick={handleSaveClick} className="btn btn-success mr-2">
                            Save
                        </button>
                        <button onClick={handleCancelClick} className="btn btn-secondary">
                            Cancel
                        </button>
                    </div>
                ) : (
                    <>
                        <button onClick={handleEditClick} className="btn btn-primary mr-2">
                            Edit
                        </button>
                        <button onClick={handleDeleteClick} className="btn btn-danger">
                            Delete
                        </button>
                    </>
                )}
            </div>
        </li>
    );
};

export default TodoItem;
