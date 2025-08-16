import React from 'react'
import UserImg from '../assets/userimg.png'
import Logout from '../assets/logout.svg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS_COMPLETION = ["#4CAF50", "#F44336"]; // Green, Red
const COLORS_PRIORITY = ["#E53935", "#FFB300", "#43A047"]; // Red, Yellow, Green

const Profile = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [user, setUser] = React.useState({
    username: "",
    email: "",
    joined: "",
  });

  const [stats, setStats] = React.useState({
    total: 0,
    completed: 0,
    pending: 0,
    pinned: 0,
    high: 0,
    medium: 0,
    low: 0
  });

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser({
          username: res.data.user.username,
          email: res.data.user.email,
          joined: new Date(res.data.user.createdAt).toLocaleDateString("en-US"),
        });

      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const tasks = res.data;
        const completed = tasks.filter(t => t.status === "Completed").length;
        const pinned = tasks.filter(t => t.pin).length;
        const total = tasks.length;
        const pending = total - completed;
        const high = tasks.filter(t => t.priority === "High").length;
        const medium = tasks.filter(t => t.priority === "Medium").length;
        const low = tasks.filter(t => t.priority === "Low").length;

        setStats({ total, completed, pending, pinned, high, medium, low });
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };

    fetchUser();
    fetchStats();

  }, []);


  const completionData = [
    { name: "Completed", value: stats.completed },
    { name: "Pending", value: stats.pending },
  ];

  const priorityData = [
    { name: "High", value: stats.high },
    { name: "Medium", value: stats.medium },
    { name: "Low", value: stats.low },
  ];

  return (
    <>
      <div className='userdetails'>
        <img src={UserImg} alt="userprofile" />
        <span>{user.username || "Loading..."}</span>
        <p>{user.email}</p>
        <p>Joined: {user.joined}</p>
      </div>
      <div className="stats">
        <div className="stats-group">
          <h3>Task Progress</h3>
          <div className="stat-card">Total Tasks: {stats.total}</div>
          <div className="stat-card">Completed: {stats.completed}</div>
          <div className="stat-card">Pending: {stats.pending}</div>
          <PieChart width={300} height={250}>
            <Pie
              data={completionData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
              label
            >
              {completionData.map((_, i) => (
                <Cell key={i} fill={COLORS_COMPLETION[i]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div className="stats-group">
          <h3>Priorities</h3>
          <div className="stat-card">High Priority: {stats.high}</div>
          <div className="stat-card">Medium Priority: {stats.medium}</div>
          <div className="stat-card">Low Priority: {stats.low}</div>
          <PieChart width={300} height={250}>
            <Pie
              data={priorityData}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              label
            >
              {priorityData.map((_, i) => (
                <Cell key={i} fill={COLORS_PRIORITY[i]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div className="stats-group">
          <h3>Other</h3>
          <div className="stat-card">Pinned: {stats.pinned}</div>
        </div>
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
