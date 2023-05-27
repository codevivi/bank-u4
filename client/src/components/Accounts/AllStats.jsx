import formatCurrency from "../../utils/formatCurrency";
function AllStats({ publicStats, privateStats }) {
  const countAverage = () => {
    const average = Number(publicStats.totalMoney) / Number(publicStats.count);
    if (isNaN(average)) {
      return 0;
    }
    return average;
  };
  return (
    <div className="info">
      <p>
        <span className="info-header">Klientų skaičius: </span>
        <span className="info-stat">{publicStats !== null && publicStats.count}</span>
      </p>
      <p>
        <span className="info-header">Bendra laikoma suma: </span>
        <span className="info-stat">{publicStats !== null && formatCurrency(publicStats.totalMoney)}</span>
      </p>
      <p>
        <span className="info-header">Klientai be asmens dokumento kopijos: </span>
        <span className="info-stat">{privateStats !== null && privateStats.clientsWithNoId}</span>
      </p>

      <p>
        <span className="info-header">Klientai su nulinėmis sąskaitomis: </span>
        <span className="info-stat">{privateStats !== null && privateStats.clientsWithNoMoney}</span>
      </p>
      <p>
        <span className="info-header">Klientai su minusinėmis sąskaitomis: </span>
        <span className="info-stat">{privateStats !== null && privateStats.clientsWithNegativeMoney}</span>
      </p>

      <p>
        <span className="info-header">Klientai su pinigais sąskaitose: </span>
        <span className="info-stat">{privateStats !== null && privateStats.clientsWithMoney}</span>
      </p>
    </div>
  );
}

export default AllStats;
