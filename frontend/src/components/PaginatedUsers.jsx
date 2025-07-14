import { useState, useEffect } from "react";

const Loading = () => (
  <div className="text-center text-yellow-200">Loading...</div>
);

const Leaderboard = ({
  leaderboard,
  isLeaderboardLoading,
  // getProfileImage,
}) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Show 3 users per page
  const totalItems = leaderboard ? leaderboard.length - 3 : 0; // Exclude top 3
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current items (excluding top 3)
  const indexOfLastItem = currentPage * itemsPerPage + 3; // Start after top 3
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leaderboard
    ? leaderboard.slice(3).slice(indexOfFirstItem - 3, indexOfLastItem - 3)
    : [];

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle previous and next
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Reset to first page when leaderboard data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [leaderboard]);

  const getProfileImage = (index) => {
    return `https://placehold.co/300x300/tomato/white?text=${index + 1}`;
  };

  return (
    <div className="relative">
      {isLeaderboardLoading && <Loading />}
      {!isLeaderboardLoading && leaderboard && (
        <div>
          <div className="mb-6 bg-white/10 rounded-lg p-4 shadow-lg">
            <div className="space-y-2">
              {/* Rest of the Users with Pagination */}
              {currentItems.map((user, index) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between bg-white/20 p-2 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={getProfileImage(index + 3)} // Offset for top 3
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

          {/* Pagination Controls */}
          {totalItems > 0 && (
            <div className="flex justify-center mt-6 gap-2">
              <button
                onClick={goToPreviousPage}
                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded-md cursor-pointer ${
                      currentPage === number
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                  >
                    {number}
                  </button>
                )
              )}
              <button
                onClick={goToNextPage}
                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
