import React from "react";
const Button = ({ children, ...props }) => {
    return (
        <button className="todo_btn" {...props}>
            {children}
        </button>
    )
}
export default Button