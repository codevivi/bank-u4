//action types
export const SET = 1;
export const SORT = 2;
export const FILTER = 3;
//filters
const ALL = 10;
const BLOCKED = 11;
const UNBLOCKED = 12;
const EMPTY = 13;
const NEGATIVE = 14;
const POSITIVE = 15;
//sorts
const UNSORTED = 100;
const NAME = 101;
const SURNAME = 102;
const MONEY = 103;

export const filters = [
  { key: ALL, text: "visos" },
  { key: BLOCKED, text: "užblokuotos" },
  { key: UNBLOCKED, text: "neužblokuotos" },
  { key: EMPTY, text: "tuščios" },
  { key: NEGATIVE, text: "minusinės" },
  { key: POSITIVE, text: "su pinigais" },
];
// //sorts
export const sorts = [
  { key: UNSORTED, text: "ne rūšiuotos" },
  { key: SURNAME, text: "pagal pavardę" },
  { key: NAME, text: "pagal vardą" },
  { key: MONEY, text: "pagal sumą" },
];

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
      case MONEY:
        s.sort((a, b) => Number(b.money) - Number(a.money));
        break;
      default:
        s.sort((a, b) => a.row - b.row);
    }
  }

  return s;
};
