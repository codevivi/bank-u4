import formatCurrency from "../utils/formatCurrency";
function PublicStats({ stats }) {
  const countAverage = () => {
    const average = Number(stats.totalMoney) / Number(stats.count);
    if (isNaN(average)) {
      return 0;
    }
    return average;
  };
  return (
    <div className="info">
      <p>
        <span className="info-header">Klientų skaičius: </span>
        <span className="info-stat">{stats !== null && stats.count}</span>
      </p>
      <p>
        <span className="info-header">Bendra laikoma suma: </span>
        <span className="info-stat">{stats !== null && formatCurrency(stats.totalMoney)}</span>
      </p>
      <p>
        <span className="info-header">Vidutinė suma sąskaitose: </span>
        <span className="info-stat">{stats !== null && formatCurrency(countAverage())}</span>
      </p>
    </div>
  );
}

export default PublicStats;
