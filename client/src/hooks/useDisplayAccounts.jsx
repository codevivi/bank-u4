import { useCallback, useEffect, useReducer, useState } from "react";
import { FILTER, SORT, SET, displayAccountsReducer } from "../reducers/displayAccountsReducer.js";

export default function useDisplayAccounts() {
  const [displayAccounts, dispatch] = useReducer(displayAccountsReducer, null);
  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    if (filter === null) {
      return;
    }
    return dispatch({ type: FILTER, filter: filter.key });
  }, [filter]);

  useEffect(() => {
    if (sort === null) {
      return;
    }
    return dispatch({ type: SORT, sort: sort.key });
  }, [sort]);

  const applyFilter = useCallback((changedFilter) => {
    return setFilter(changedFilter);
  }, []);
  const applySort = useCallback((changedSort) => {
    return setSort(changedSort);
  }, []);

  const resetDisplayAccounts = useCallback(
    (accounts) => {
      return dispatch({ type: SET, filter: filter?.key, sort: sort?.key, payload: accounts });
    },
    [filter, sort]
  );

  return [displayAccounts, filter, applyFilter, sort, applySort, resetDisplayAccounts];
}
