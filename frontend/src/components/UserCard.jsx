const LeaderboardCard = ({ leaderboard }) => {
  const data = leaderboard.slice(0, 3);

  return (
    <div className="  text-white relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/confetti.png')] opacity-10 animate-float z-0"></div>

      <div className="flex justify-center gap-4 p-4 bg-white/10 rounded-lg shadow-lg backdrop-blur-md">
        {data?.map((user) => (
          <div
            key={user._id}
            className={`flex flex-col items-center p-4 rounded-lg w-64 transition-transform duration-300 cursor-pointer ${
              user.rank === 1
                ? "bg-gradient-to-b from-gray-300 to-gray-400 border-2 border-gray-300"
                : user.rank === 2
                ? "bg-gradient-to-b from-yellow-700 to-yellow-300 border-2 border-yellow-400"
                : "bg-gradient-to-b from-amber-800 to-amber-600 border-2 border-amber-700"
            } hover:scale-105`}
          >
            <img
              src={
                user.image ||
                (user._doc && user._doc.image) ||
                `https://placehold.co/300x300/tomato/white?text=${user.name[0]}`
              }
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white mb-2"
            />
            <h3 className="text-lg font-bold">{user.name}</h3>
            <p className="text-md font-semibold">
              {user.totalPoints.toLocaleString()}
            </p>

            <span className="text-2xl mt-2">
              {/* {user.rank === 1 ? "👑" : "🏆"} */}
              {user.rank === 1 ? "👑" : user.rank === 2 ? "🥈" : "🥉"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardCard;
