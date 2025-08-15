import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Task from '../assets/task.svg'
import Edit from '../assets/edit.svg'
import axios from 'axios'

const ListAndEdit = () => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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


  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading tasks...</p>;
  }

  return (
    <>
      <div className='pin'>
        <span>Task List</span>
        <img src={Task} alt="task" />
      </div>
      <div style={{ display: "flex", gap: "38px", justifyContent: "center", flexWrap: "wrap" }}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Card
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              dueDate={new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              status={task.status}
              color="blue"
              icon={Edit}
              typeIcon="Edit"
            />
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </div>
    </>
  )
}

export default ListAndEdit
