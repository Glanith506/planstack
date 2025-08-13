import React from 'react'
import UserImg from '../assets/userimg.png'
import Logout from '../assets/logout.svg'

const Profile = () => {
  return (
    <>
    <div className='userdetails'>
      <img src={UserImg} alt="userprofile" />
      <span>username</span>
    </div>
    <div style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
      <button className='logBtn' type="submit">
        <span>Logout</span>
        <img src={Logout} alt="logout" />
      </button>
    </div>
    </>
  )
}

export default Profile
