import { combineReducers, createReducer } from "@reduxjs/toolkit";
import shortid from "shortid";
import { addContact, deleteContact } from "./contactsActions";
import { updateFilter } from "./filterActions";

const initialState = JSON.parse(localStorage.getItem("contacts") ?? []);

const itemsReducer = createReducer(initialState, {
  [addContact]: (state, action) => {
    const { name, number } = action.payload;

    if (state.find((contact) => contact.name === name)) {
      return state;
    }

    return [...state, { id: shortid.generate(), name, number }];
  },
  [deleteContact]: (state, action) =>
    state.filter((c) => c.id !== action.payload.id),
});

const filterReducer = createReducer("", {
  [updateFilter]: (_, action) => action.payload ?? "",
});

export const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});
