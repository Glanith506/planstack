import React, { useState } from 'react'

const Create = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token")?.replace(/^"(.*)"$/, "$1");

    if (!token) {
      return alert("You must be logged in to create a task.");
    }

    const taskData = { title, description, dueDate, priority };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert("Task created successfully!");
        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority("");
      } else {
        alert(data.message || "Failed to create task");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };


  return (
    <div className="createTask-page">
      <h2>Create Task</h2>

      <form className="createTask-form" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Description:</label>
        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <label>Priority:</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="">Choose your priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit" className="createBtn">
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default Create
