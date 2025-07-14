function ClaimPoints({
  users,
  message,
  selectedUser,
  setSelectedUser,
  handleClaimPoints,
  fetchPointHistory,
}) {
  return (
    <>
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
    </>
  );
}

export default ClaimPoints;
