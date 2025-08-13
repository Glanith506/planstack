import React from 'react'
import Card from '../components/Card'
import Pin from '../assets/pin.svg'
import Task from '../assets/task.svg'
import Check from '../assets/check.svg'

const Home = () => {
  return (
    <>
      <div className='pin'>
        <span>Pinned Task</span>
        <img src={Pin} alt="pin" />
      </div>
     <div style={{ display: "flex", gap: "38px", justifyContent: "center", flexWrap: "wrap" }}>
        <Card
          id="1"
          title="Title 1"
          description="Pinned task"
          dueDate="Aug 20"
          status="Done"
          color="gray"
          icon={Check}
          typeIcon="Check"
        />
        <Card
          id="1"
          title="Title 2"
          description="Pinned task"
          dueDate="Aug 21"
          status="In Progress"
          color="gray"
          icon={Check}
          typeIcon="Check"
        />
        <Card
          id="1"
          title="Title 3"
          description="Pinned task"
          dueDate="Aug 22"
          status="Not Started"
          color="gray"
          icon={Check}
          typeIcon="Check"
        />
      </div>
      <div className='task'>
        <span>Task List</span>
        <img src={Task} alt="task" />
      </div>
     <div style={{ display: "flex", gap: "38px", justifyContent: "center", flexWrap: "wrap" }}>
        <Card
          id="1"
          title="Title 1"
          description="Pinned task"
          dueDate="Aug 20"
          status="Done"
          color="red"
          icon={Check}
          typeIcon="Check"
        />
        <Card
          id="1"
          title="Title 2"
          description="Pinned task"
          dueDate="Aug 21"
          status="In Progress"
          color="red"
          icon={Check}
          typeIcon="Check"
        />
        <Card
          id="1"
          title="Title 3"
          description="Pinned task"
          dueDate="Aug 22"
          status="Not Started"  
          color="orange"
          icon={Check}
          typeIcon="Check"
        />
        <Card
          id="1"
          title="Title 4"
          description="Pinned task"
          dueDate="Aug 25"
          status="Not Started"  
          color="gray"
          icon={Check}
          typeIcon="Check"
        />
      </div>
    </>
  )
}

export default Home
