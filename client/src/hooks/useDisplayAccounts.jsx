import { useCallback, useEffect, useReducer, useState } from "react";
import { FILTER, SET, displayAccountsReducer } from "../reducers/displayAccountsReducer.js";

export default function useDisplayAccounts() {
  const [displayAccounts, dispatch] = useReducer(displayAccountsReducer, null);
  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    if (filter === null) {
      return;
    }
    return dispatch({ type: FILTER, filter: filter });
  }, [filter]);

  const applyFilter = useCallback((changedFilter) => {
    return setFilter(changedFilter);
  }, []);
  const applySort = useCallback((changedSort) => {
    return setSort(changedSort);
  }, []);

  const resetDisplayAccounts = useCallback(
    (accounts) => {
      return dispatch({ type: SET, filter: filter, sort: sort, payload: accounts });
    },
    [filter, sort]
  );

  return [displayAccounts, filter, applyFilter, sort, applySort, resetDisplayAccounts];
}
