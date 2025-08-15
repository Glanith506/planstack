import React from 'react'
import Card from '../components/Card'
import Pin from '../assets/pin.svg'
import Task from '../assets/task.svg'
import Check from '../assets/check.svg'
import axios from 'axios'

const Home = () => {

  const [pinnedTasks, setPinnedTasks] = React.useState([]);
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const pinned = res.data.filter(task => task.pin === true);
        const normal = res.data.filter(task => task.pin !== true);

        console.log(pinned);
        console.log(normal);

        setPinnedTasks(pinned);
        setTasks(normal);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);


  return (
    <>
      <div className='pin'>
        <span>Pinned Task</span>
        <img src={Pin} alt="pin" />
      </div>
     <div style={{ display: "flex", gap: "38px", justifyContent: "center", flexWrap: "wrap" }}>
        {pinnedTasks.length > 0 ? (
          pinnedTasks.map(task => (
            <Card
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              dueDate={new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              status={task.status}
              color="blue"
              icon={Check}
              typeIcon="Check"
            />
          ))
        ) : (
          <p className='emptyText'>No pinned tasks</p>
        )}
      </div>
      <div className='task'>
        <span>Task List</span>
        <img src={Task} alt="task" />
      </div>
     <div style={{ display: "flex", gap: "38px", justifyContent: "center", flexWrap: "wrap" }}>
     {tasks.length > 0 ? (
          tasks.map(task => (
            <Card
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              dueDate={new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              status={task.status}
              color={
                task.priority === "High"
                  ? "red"
                  : task.priority === "Medium"
                  ? "orange"
                  : "gray"
              }
              icon={Check}
              typeIcon="Check"
            />
          ))
        ) : (
          <p className='emptyText'>No tasks</p>
        )}
      </div>
    </>
  )
}

export default Home
