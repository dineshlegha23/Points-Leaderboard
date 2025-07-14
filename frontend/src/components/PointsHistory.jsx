function PointsHistory({ pointHistory }) {
  return (
    <>
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
    </>
  );
}

export default PointsHistory;
