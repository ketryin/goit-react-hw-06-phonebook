import React, { useEffect } from "react";
import { connect } from "react-redux";
import Form from "./components/Form";
import ContactsList from "./components/ContactsList";
import Filter from "./components/Filter";
import { updateFilter } from "./redux/filterActions";
import { addContact, deleteContact } from "./redux/contactsActions";

function App({ items, filter, onContactAdd, onContactDelete, onFilterUpdate }) {
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(items));
  }, [items]);

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <Form onSubmit={(name, number) => onContactAdd({ name, number })} />
      {items.length > 0 && (
        <>
          <h1>Contacts</h1>
          <Filter
            filter={filter}
            handleFilter={(e) => onFilterUpdate(e.currentTarget.value)}
          />
          <ContactsList
            filter={filter}
            contacts={items}
            onDeleteContact={(id) => onContactDelete({ id })}
          />
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  items: state.contactsReducer.items,
  filter: state.contactsReducer.filter,
});

const mapDispatchToProps = (dispatch) => ({
  onContactAdd: (value) => dispatch(addContact(value)),
  onContactDelete: (value) => dispatch(deleteContact(value)),
  onFilterUpdate: (value) => dispatch(updateFilter(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
