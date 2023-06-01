export const SET = 1;
export const SORT = 2;
export const FILTER = 3;
//filters
export const ALL = "visos";
export const BLOCKED = "užblokuotos";
export const UNBLOCKED = "neužblokuotos";
export const EMPTY = "tuščios";
export const NEGATIVE = "minusinės";
export const POSITIVE = "su pinigais";

export const filters = [ALL, BLOCKED, UNBLOCKED, EMPTY, NEGATIVE, POSITIVE];
// //sorts
export const UNSORTED = "ne rūšiuotos";
export const NAME = "pagal vardą";
export const SURNAME = "pagal pavardę";

export const displayAccountsReducer = (state, action) => {
  let s = state ? [...state] : null;
  if (action.type === SET) {
    s = action.payload.map((acc, i) => ({ ...acc, row: i, show: true }));

    if (action.filter !== null) {
      action.initialType = SET;
      action.type = FILTER; //to reapply previously selected filter
    }
  }
  if (action.type === FILTER) {
    switch (action.filter) {
      case BLOCKED:
        s = s.map((acc) => ({ ...acc, show: acc.blocked ? true : false }));
        break;
      case UNBLOCKED:
        s = s.map((acc) => ({ ...acc, show: acc.blocked ? false : true }));
        break;
      case EMPTY:
        s = s.map((acc) => ({ ...acc, show: Number(acc.money) === 0 ? true : false }));
        break;
      case NEGATIVE:
        s = s.map((acc) => ({ ...acc, show: Number(acc.money) < 0 ? true : false }));
        break;
      case POSITIVE:
        s = s.map((acc) => ({ ...acc, show: Number(acc.money) > 0 ? true : false }));
        break;
      default:
        s = s.map((acc) => ({ ...acc, show: true }));
    }

    if (action.sort !== null && action.initialType === SET) {
      //to reapply previously selected sort if accounts reset
      action.type = SORT;
    }
  }

  if (action.type === SORT) {
    switch (action.sort) {
      case NAME:
        s.sort((a, b) => a.name.localeCompare(b.name, "lt", { sensitivity: "base" }));
        break;
      case SURNAME:
        s.sort((a, b) => a.surname.localeCompare(b.surname, "lt", { sensitivity: "base" }));
        break;
      default:
        s.sort((a, b) => a.row - b.row);
    }
  }

  return s;
};
