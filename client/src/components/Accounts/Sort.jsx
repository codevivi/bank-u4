import { useContext, useState } from "react";
import { BiExpandHorizontal } from "react-icons/bi";
import { AccountsContext } from "../../Contexts/AccountsCtx";
import { sorts } from "../../reducers/displayAccountsReducer.js";

function Sort() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { sort, applySort } = useContext(AccountsContext);

  const handleSortChange = (newSort) => {
    return () => applySort(newSort);
  };
  return (
    <div className="filters">
      <div className="filter">
        <button className="filter-expand-btn accent" onClick={() => setIsExpanded((is) => !is)}>
          <span>Rūšiavimas: </span>
          <span className="dark">{sort ? sort?.text : "Nerūšiuotos"}</span>
          <span className="filter-icon">
            {" "}
            <BiExpandHorizontal />
          </span>
        </button>
        {isExpanded && (
          <div className="filter-selection">
            {sorts.map((s, i) => (
              <button key={i.toString() + s.key} className={"filter-btn " + (sort?.key === s.key ? "active" : "")} onClick={handleSortChange(s)}>
                {s.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sort;
