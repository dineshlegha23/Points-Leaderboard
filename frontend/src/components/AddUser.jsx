function AddUser({ newUserName, handleAddUser, setNewUserName }) {
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
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition cursor-pointer"
          >
            Add User
          </button>
        </div>
      </div>
    </>
  );
}

export default AddUser;
