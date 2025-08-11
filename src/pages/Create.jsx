import React from 'react'

const Create = () => {
  return (
    <div className="createTask-page">
      <h2>Create Task</h2>

      <form className="createTask-form">
        <label>Title:</label>
        <input type="text" placeholder="Enter title" />

        <label>Description:</label>
        <textarea placeholder="Enter description"></textarea>

        <label>Due Date:</label>
        <input type="date" />

        <label>Priority:</label>
        <select>
          <option>Choose your priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <div style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
          <button type="submit" className="createBtn">Create</button>
        </div>
      </form>
    </div>
  )
}

export default Create
