import Loading from "./Loading";
import UserCard from "./UserCard";
import PaginatedUsers from "./PaginatedUsers";

function Leaderboard({ leaderboard, isLeaderboardLoading }) {
  return (
    <div className="relative">
      {isLeaderboardLoading && <Loading />}
      <div className="mb-6 bg-white/10 rounded-lg p-4 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-yellow-200">
          Leaderboard
        </h3>
        <div className="space-y-2">
          <UserCard leaderboard={leaderboard} />

          <PaginatedUsers leaderboard={leaderboard} />
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
