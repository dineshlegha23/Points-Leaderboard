import axios from "axios";
import { useState } from "react";

function AddUser({ fetchUsers, fetchLeaderboard, setMessage }) {
  const [newUserName, setNewUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddUser = async () => {
    if (!newUserName) {
      setError("Please enter name");
      return;
    }
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
      setError("");
    }
  };

  return (
    <>
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
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition cursor-pointer disabled:bg-gray-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin px-8 w-8 h-6 rounded-full">
                <div className="bg-white w-2 h-2 rounded-full"></div>
              </div>
            ) : (
              "Add User"
            )}
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </>
  );
}

export default AddUser;
