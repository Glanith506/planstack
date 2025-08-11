import React from 'react'
import Card from '../components/Card'
import Task from '../assets/task.svg'
import Edit from '../assets/edit.svg'


const ListAndEdit = () => {
  return (
    <>
      <div className='pin'>
        <span>Task List</span>
        <img src={Task} alt="task" />
      </div>
     <div style={{ display: "flex", gap: "38px", justifyContent: "center", flexWrap: "wrap" }}>
        <Card
          id="2"
          title="Title 1"
          description="Pinned task"
          dueDate="Aug 20"
          status="Done"
          color="blue"
          icon={Edit}
          typeIcon="Edit"
        />
        <Card
          id="3"
          title="Title 2"
          description="Pinned task"
          dueDate="Aug 21"
          status="In Progress"
          color="blue"
          icon={Edit}
          typeIcon="Edit"
        />
        <Card
          id="4"
          title="Title 3"
          description="Pinned task"
          dueDate="Aug 22"
          status="Not Started"  
          color="blue"
          icon={Edit}
          typeIcon="Edit"
        />
        <Card
          id="5"
          title="Title 4"
          description="Pinned task"
          dueDate="Aug 25"
          status="Not Started"  
          color="blue"
          icon={Edit}
          typeIcon="Edit"
        />
      </div>
    </>
  )
}

export default ListAndEdit
