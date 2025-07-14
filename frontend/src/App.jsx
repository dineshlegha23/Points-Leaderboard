import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [pointHistory, setPointHistory] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [message, setMessage] = useState("");

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

  // Handle add user
  const handleAddUser = async () => {
    if (!newUserName) {
      setMessage("Please enter a user name");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_PROD_URL}/api/users`, {
        name: newUserName,
      });
      setMessage("User added successfully");
      setNewUserName("");
      fetchUsers();
      fetchLeaderboard();
    } catch (error) {
      setMessage("Error adding user");
      console.error(error);
    }
  };

  // Placeholder profile images (you can replace with actual URLs)
  const getProfileImage = (index) => {
    return `https://placehold.co/300x300/tomato/white?text=${index + 1}`;
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
      <div className="mb-6 bg-white/10 rounded-lg p-4 shadow-lg">
        <h3 className="text-xl font-semibold mb-2 text-yellow-200">
          Add New User
        </h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Enter user name"
            className="border border-gray-300 rounded-md p-2 text-black flex-1 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-700"
          />
          <button
            onClick={handleAddUser}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition cursor-pointer"
          >
            Add User
          </button>
        </div>
      </div>

      {/* User Selection and Claim Points */}
      <div className="mb-6 bg-white/10 rounded-lg p-4 shadow-lg">
        <h3 className="text-xl font-semibold mb-2 text-yellow-200">
          Claim Points
        </h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={selectedUser}
            onChange={(e) => {
              setSelectedUser(e.target.value);
              fetchPointHistory(e.target.value);
            }}
            className="border border-gray-300 rounded-md p-2 text-black flex-1 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleClaimPoints}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition cursor-pointer"
          >
            Claim Points
          </button>
        </div>
        {message && <p className="mt-2 text-sm text-yellow-100">{message}</p>}
      </div>

      {/* Leaderboard */}
      <div className="mb-6 bg-white/10 rounded-lg p-4 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-yellow-200">
          Leaderboard
        </h3>
        <div className="space-y-2">
          {/* Top 3 with Trophies */}
          {leaderboard.slice(0, 3).map((user, index) => (
            <div
              key={user._id}
              className="flex items-center justify-between bg-white/20 p-2 rounded-md"
            >
              <div className="flex items-center gap-2">
                <img
                  src={getProfileImage(index)}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />
                <span className="font-bold">{user.name}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>{user.totalPoints.toLocaleString()}</span>
                <span className="text-2xl">
                  {index === 0 ? "👑" : index === 1 ? "🥈" : "🥉"}
                </span>
              </div>
            </div>
          ))}

          {/* Rest of the Users */}
          {leaderboard.slice(3).map((user, index) => (
            <div
              key={user._id}
              className="flex items-center justify-between bg-white/20 p-2 rounded-md"
            >
              <div className="flex items-center gap-2">
                <img
                  src={getProfileImage(index + 3)}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />
                <span className="font-bold">{user.name}</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span>{user.totalPoints.toLocaleString()}</span>
                <span className="text-2xl">🏆</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Point History */}
      <div className="bg-white/10 rounded-lg p-4 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-yellow-200">
          Point History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/20">
                <th className="border border-gray-200 p-2 text-left">User</th>
                <th className="border border-gray-200 p-2 text-left">Points</th>
                <th className="border border-gray-200 p-2 text-left">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {pointHistory.map((entry) => (
                <tr key={entry._id} className="hover:bg-white/30">
                  <td className="border border-gray-200 p-2">
                    {entry.userId.name}
                  </td>
                  <td className="border border-gray-200 p-2">{entry.points}</td>
                  <td className="border border-gray-200 p-2">
                    {new Date(entry.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
