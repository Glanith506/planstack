import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/card.css";

const Card = ({ id, typeIcon, title, description, dueDate, status, color, icon }) => {

  const [editShow, setEditShow] = React.useState(false);

  const checkType = (typeIcon) => {
    if (typeIcon === "Edit") {
      setEditShow(true);
      console.log("Edit");
    }
    else if (typeIcon === "Check") {
      console.log("Completed");
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
          <img
            src={icon}
            alt="icon"
            style={{ cursor: "pointer" }}
            onClick={() => checkType(typeIcon)}
          />
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
            // value={task.title}
            // onChange={(e) => setTask({ ...task, title: e.target.value })}
            />

            <label>Description:</label>
            <textarea
            // value={task.description}
            // onChange={(e) => setTask({ ...task, description: e.target.value })}
            ></textarea>

            <label>Due Date:</label>
            <input
              type="date"
            // value={task.dueDate}
            // onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            />

            <label>Status:</label>
            <input
              type="text"
            // value={task.status}
            // onChange={(e) => setTask({ ...task, status: e.target.value })}
            />

            <label>Priority:</label>
            <select
            // value={task.priority}
            // onChange={(e) => setTask({ ...task, priority: e.target.value })}
            >
              <option value="">Choose your priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <div style={{display:"flex", alignItems:'center', justifyContent: "center"}}>
              <button
              // onClick={onSubmit}
              className='editBtn'
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
