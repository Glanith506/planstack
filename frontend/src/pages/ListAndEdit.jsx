import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Task from '../assets/task.svg'
import Edit from '../assets/edit.svg'
import axios from 'axios'

const ListAndEdit = () => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const incompleteTasks = tasks.filter(task => task.status !== "Completed");
  const completedTasks = tasks.filter(task => task.status === "Completed");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage
          .getItem("token")
          ?.replace(/^"(.*)"$/, "$1");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskChange = (data, action) => {
    if (action === "delete") {
      setTasks(prev => prev.filter(task => task._id !== data));
    } else {
      setTasks(prev =>
        prev.map(task => (task._id === data._id ? data : task))
      );
    }
  };

  return (
    <>
      <div className='pin'>
        <span>Task List</span>
        <img src={Task} alt="task" />
      </div>
      <div style={{ display: "flex", gap: "38px", justifyContent: "center", flexWrap: "wrap" }}>
        {!loading ? (
          tasks.length > 0 ? (
            <>
              {incompleteTasks.map((task) => (
                <Card
                  key={task._id}
                  id={task._id}
                  title={task.title}
                  description={task.description}
                  dueDate={new Date(task.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                  status={task.status}
                  color="blue"
                  priority={task.priority}
                  pin={task.pin}
                  icon={Edit}
                  typeIcon="Edit"
                  onStatusChange={handleTaskChange}
                />
              ))}
              {completedTasks.length > 0 && (
                <div style={{ width: "100%", marginTop: "40px", marginBottom: "50px" }}>
                  <div className='task' style={{ marginTop: "0px" }}>
                    <span>Completed Task</span>
                    <img src={Task} alt="task" />
                  </div>
                  <div style={{ display: "flex", gap: "38px", justifyContent: "center", flexWrap: "wrap" }}>
                    {completedTasks.map((task) => (
                      <Card
                        key={task._id}
                        id={task._id}
                        title={task.title}
                        description={task.description}
                        dueDate={new Date(task.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                        status={task.status}
                        color="blue"
                        priority={task.priority}
                        pin={task.pin}
                        icon={Edit}
                        typeIcon="Edit"
                        onStatusChange={handleTaskChange}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p>No tasks found</p>
          )
        ) : (
          <p className="emptyText">Loading...</p>
        )}
      </div>

    </>
  )
}

export default ListAndEdit
