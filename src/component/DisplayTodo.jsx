import React from 'react'

function DisplayTodo(props) {
    let displayTodoItem = props.data;
    return (
        <div>
            <h1>Display Todo</h1>
            {displayTodoItem.map((item, index) => {
                return (<div key={index}>
                    {item.title}-{item.title2}-{item.desc}
                </div>)
            })}
        </div>
    )
}

export default DisplayTodo