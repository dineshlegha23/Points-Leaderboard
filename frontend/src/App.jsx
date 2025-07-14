import { useState, useEffect } from "react";
import axios from "axios";
import AddUser from "./components/AddUser";
import ClaimPoints from "./components/ClaimPoints";
import Leaderboard from "./components/Leaderboard";
import PointsHistory from "./components/PointsHistory";

function App() {
  const [selectedUser, setSelectedUser] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [pointHistory, setPointHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PROD_URL}/api/leaderboard`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch leaderboard
  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PROD_URL}/api/leaderboard`
      );
      setLeaderboard(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  // Fetch point history
  const fetchPointHistory = async (userId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_PROD_URL}/api/point-history/${userId}`
      );
      setPointHistory(response.data);
    } catch (error) {
      console.error("Error fetching point history:", error);
    }
  };

  // Handle claim points
  const handleClaimPoints = async () => {
    if (!selectedUser) {
      setMessage("Please select a user");
      return;
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PROD_URL}/api/claim-points`,
        {
          userId: selectedUser,
        }
      );
      setMessage(
        `${response.data.user.name} received ${response.data.points} points!`
      );
      fetchLeaderboard();
      fetchPointHistory(selectedUser);
    } catch (error) {
      setMessage("Error claiming points");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-600 via-orange-400 to-red-500 p-4 sm:p-6 lg:p-8 text-white">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-6">
        Points Leaderboard
      </h1>

      {/* Add User Form */}
      <AddUser
        fetchUsers={fetchUsers}
        fetchLeaderboard={fetchLeaderboard}
        setMessage={setMessage}
      />

      {/* User Selection and Claim Points */}
      <ClaimPoints
        message={message}
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        handleClaimPoints={handleClaimPoints}
        fetchPointHistory={fetchPointHistory}
      />

      {/* Leaderboard */}
      <Leaderboard leaderboard={leaderboard} />

      {/* Point History */}
      <PointsHistory pointHistory={pointHistory} />
    </div>
  );
}

export default App;
