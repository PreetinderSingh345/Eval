import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './ContentEntries.css';

function ContentEntries({
  entries,
  fields,
  handleCreateNewEntry,
  handleDeleteEntry,
}) {
  const [fieldValues, setFieldValues] = useState(
    new Array(fields.length).fill('')
  );

  function handleInputChange(event, index) {
    console.log('see here', fieldValues[index], event.target.value);

    const fieldValuesTemp = [...fieldValues];

    fieldValuesTemp[index] = event.target.value;

    setFieldValues(fieldValuesTemp);
  }

  function handleAddEntry(event) {
    event.preventDefault();

    const entry = {};

    fieldValues.forEach((fieldValue) => {
      entry[fieldValue] = fieldValue;
    });

    handleCreateNewEntry(entry);
  }

  function handleRemoveEntry(entryId) {
    handleDeleteEntry(entryId);
  }

  return (
    <>
      <form onSubmit={handleAddEntry}>
        {Object.keys(fields).map((field, index) => (
          <div key={uuidv4()}>
            <label htmlFor={field}>{field}</label>
            <input
              type="text"
              id={field}
              name={field}
              value={fieldValues[index]}
              onChange={(event) => handleInputChange(event, index)}
            />
          </div>
        ))}
        <button type="submit">Add Entry</button>
      </form>

      <div id="content-entries">
        {Object.keys(entries).map((key) => {
          return (
            <div
              key={uuidv4()}
              className="content-entry"
              onClick={() => handleRemoveEntry(key)}
            >
              {Object.keys(entries[key]).map((entryKey) => {
                return (
                  <div key={uuidv4()}>
                    <h1>{entries[key][entryKey]}</h1>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ContentEntries;
