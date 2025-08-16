import React from 'react';
import "../styles/card.css";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Delete from '../assets/delete.svg'
import Pin from '../assets/pinwhite.svg'
import Unpin from '../assets/unpin.svg'

const Card = ({ id, typeIcon, title, description, dueDate, status, priority, pin, color, icon, onStatusChange }) => {

  const [editShow, setEditShow] = React.useState(false);
  const [task, setTask] = React.useState({ title, description, dueDate, status, priority, pin });
  const [editTask, setEditTask] = React.useState({
    title,
    description,
    dueDate,
    status,
    priority
  });

  const nav = useNavigate();

  const checkType = async (typeIcon) => {
    if (typeIcon === "Edit") {
      setEditShow(true);
    }
    else if (typeIcon === "Check") {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.patch(
          `${import.meta.env.VITE_API_URL}/tasks/${id}`,
          { status: "Completed" },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log("Task completed:", res.data);
        if (onStatusChange) onStatusChange(id);
      } catch (err) {
        console.error("Error updating task status:", err.response?.data || err.message);
      }
    }
    else if (typeIcon === "Delete") {
      const confirmDelete = window.confirm("Are you sure you want to delete this task?");
      if (!confirmDelete) return;

      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/tasks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (onStatusChange) onStatusChange(id, "delete");
      } catch (err) {
        console.error("Error deleting task:", err.response?.data || err.message);
      }
    }
    else if (typeIcon === "Pin") {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.patch(
          `${import.meta.env.VITE_API_URL}/tasks/${id}`,
          { pin: !task.pin },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTask((prev) => ({ ...prev, pin: res.data.task.pin }));

        // if (onStatusChange) onStatusChange(id, "pin", res.data.task.pin);

      } catch (err) {
        // console.error("Error updating task pin:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Error updating task pin");
      }
    }
  };

  const onSubmitEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/tasks/${id}`,
        editTask,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("Task updated:", res.data);
      setTask(res.data);
      setEditShow(false);
      if (onStatusChange) onStatusChange(res.data, "update");
      nav('/');
    } catch (err) {
      console.error("Error updating task:", err.response?.data || err.message);
    }
  };

  const onClose = () => {
    setEditShow(false);
  }

  return (
    <>
      <div className={`card ${color}`}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3 className="card-title">{title}</h3>
          <div style={{ display: "flex", gap: "5px" }}>
            {typeIcon === "Edit" && (
              <>
                {task.status !== "Completed" && (
                  <img
                    src={task.pin ? Unpin : Pin}
                    alt={task.pin ? "Unpin" : "Pin"}
                    style={{ cursor: "pointer" }}
                    onClick={() => checkType("Pin")}
                  />
                )}
                <img
                  src={Delete}
                  alt="icon"
                  style={{ cursor: "pointer" }}
                  onClick={() => checkType("Delete")}
                />
              </>
            )}
            <img
              src={icon}
              alt="icon"
              style={{ cursor: "pointer" }}
              onClick={() => checkType(typeIcon)}
            />
          </div>
        </div>
        <p className="card-description">{description}</p>
        <div className="card-footer">
          <span className="card-date">Due: {dueDate}</span>
          <span className="card-status">{status}</span>
        </div>
      </div>

      {editShow && (
        <div className="editCard">
          <div className="editCard-content">
            <div style={{ position: "relative", textAlign: "center" }}>
              <h2 style={{ margin: 0 }}>Edit Task</h2>
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  color: "#fff",
                  position: "absolute",
                  top: "-5px",
                  right: 0,
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <label>Title:</label>
            <input
              type="text"
              value={editTask.title}
              onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
            />

            <label>Description:</label>
            <textarea
              value={editTask.description}
              onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
            ></textarea>

            <label>Due Date:</label>
            <input
              type="date"
              value={editTask.dueDate}
              onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
            />

            <label>Status:</label>
            <select
              value={editTask.status}
              onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
            >
              <option value="" disabled>Choose your status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            <label>Priority:</label>
            <select
              value={editTask.priority}
              onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
            >
              <option value="" disabled>Choose your priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <div style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
              <button
                className='editBtn'
                onClick={onSubmitEdit}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
