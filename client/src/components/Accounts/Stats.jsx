import formatCurrency from "../../utils/formatCurrency";
function Stats({ stats }) {
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
    </div>
  );
}

export default Stats;
