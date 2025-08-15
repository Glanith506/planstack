import React from 'react'
import UserImg from '../assets/userimg.png'
import Logout from '../assets/logout.svg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
  
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setUsername(res.data.user.username);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
  
    fetchUser();
  }, []);
  

  return (
    <>
    <div className='userdetails'>
      <img src={UserImg} alt="userprofile" />
      <span>{username || "Loading..."}</span>
    </div>
    <div style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
      <button className='logBtn' type="button" onClick={handleLogout}>
        <span>Logout</span>
        <img src={Logout} alt="logout" />
      </button>
    </div>
    </>
  )
}

export default Profile
