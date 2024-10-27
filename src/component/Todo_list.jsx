import React, { useState } from 'react';
import './Todo_list.css';

export default function TodoApp() { 
    const [taskInput, setTaskInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');

    const addTask = () => {
        if (taskInput.trim()) {
            setTaskInput('');
            setTasks([...tasks, { text: taskInput, completed: false }]);
        }
    };

    const checkboxChange = (index) => {
        setTasks(tasks.map((task, idx) => {
            if (idx === index) {
                return { ...task, completed: !task.completed };
            } else {
                return task;
            }
        }));
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((item, idx) => idx !== index));
    };

    const removeCheckedTasks = () => {
        setTasks(tasks.filter((task) => !task.completed));
    };

    const handleEditStart = (index) => {
        setEditIndex(index);
        setEditText(tasks[index].text);
    };

    const handleEditSave = (index) => {
        setTasks(tasks.map((task, idx) => {
            if (idx === index) {
                return { ...task, completed: !task.completed };
            } else {
                return task
            }
        }));
        setEditIndex(null);
        setEditText('');
    };

    const completedTasksCount = tasks.filter(task => task.completed).length;
    const totalTasksCount = tasks.length;
    const completepercentage = totalTasksCount ? (completedTasksCount / totalTasksCount) * 100 : 0;

    return (
        <div className="container">
            <h1>TODOLIST</h1>
            <div>
                <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder='What needs to be done?'
                />
                <button onClick={addTask}>+</button>
            </div>
            <div>
                {tasks.map((task, index) => (
                    <div key={index} className="task-item">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => checkboxChange(index)}
                        />
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {(() => {
                                if (editIndex === index) {
                                    return (
                                        <input
                                            type="text"
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            onBlur={() => handleEditSave(index)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleEditSave(index)}
                                        />
                                    );
                                } else {
                                    return task.text;
                                }
                            })()}
                        </span>
                        {(() => {
                            if (editIndex !== index) {
                                return (
                                    <span className="edit-task" onClick={() => handleEditStart(index)}>
                                        🖉
                                    </span>
                                );
                            }
                            return null;
                        })()}
                        <span className="remove-task" onClick={() => removeTask(index)}> 🗙 </span>
                    </div>
                ))}
            </div>
            <div className="task-count">
                <button
                    style={{ backgroundColor: completepercentage >= 100 ? 'green' : '' }}
                    disabled={tasks.length === 0}
                >
                    {completedTasksCount} of {totalTasksCount} tasks done
                </button>
                <button
                    className="remove-button"
                    onClick={removeCheckedTasks}
                    disabled={completedTasksCount === 0}

                >
                    Remove checked 🗙
                </button>
            </div>
        </div>
    );
}
