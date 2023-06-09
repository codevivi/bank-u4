import { useContext, useState } from "react";
import { BiExpandHorizontal } from "react-icons/bi";
import { AccountsContext } from "../../Contexts/AccountsCtx";
import { filters } from "../../reducers/displayAccountsReducer.js";

function Filter() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { filter, applyFilter } = useContext(AccountsContext);

  const handleFilterChange = (newFilter) => {
    return () => applyFilter(newFilter);
  };
  return (
    <div className="filters">
      <div className="filter">
        <button className="filter-expand-btn accent" onClick={() => setIsExpanded((is) => !is)}>
          <span>filtras: </span>
          <span className="dark">{filter ? filter?.text : "visos"}</span>
          <span className="filter-icon">
            {" "}
            <BiExpandHorizontal />
          </span>
        </button>
        {isExpanded && (
          <div className="filter-selection">
            {filters.map((f, i) => (
              <button key={f.key.toString() + i} className={"filter-btn " + (filter?.key === f.key ? "active" : "")} onClick={handleFilterChange(f)}>
                {f.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Filter;
