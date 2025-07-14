function Leaderboard({ leaderboard }) {
  const getProfileImage = (index) => {
    return `https://placehold.co/300x300/tomato/white?text=${index + 1}`;
  };

  return (
    <>
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
    </>
  );
}

export default Leaderboard;
