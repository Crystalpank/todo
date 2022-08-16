import React from "react";
const TodoList = ({ tasks, toggleCheckbox }) => {

    return (
        <div className="todo_content">
            {
                tasks.map((task, index) =>
                    <div key={index} className={task.attributes.status ? "todo_item todo_item-complete" : "todo_item"}>
                        <div className="todo_item_btns">
                            <input className={task.attributes.status ? "todo_checkbox todo_checkbox-complete" : "todo_checkbox"} id={"checkbox" + index} type="checkbox" onChange={() => toggleCheckbox(task)} />
                            <label htmlFor={"checkbox" + index}></label>
                        </div>
                        <div className="todo_description">
                            <div className="todo_description__title">
                                <h3>{task.attributes.title}</h3>
                            </div>
                            <div className="todo_description__text">
                                <p>{task.attributes.description}</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default TodoList