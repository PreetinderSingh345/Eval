import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './ContentFields.css';

function ContentFields({
  contentNames,
  contentFields,
  handleCreateNewContent,
}) {
  const [type, setType] = useState('');
  const [field, setField] = useState('');
  const [fields, setFields] = useState([]);

  const [selectedContentIndex, setSelectedContentIndex] = useState(null);
  const [showContentFields, setShowContentFields] = useState(false);

  const [showAddNewField, setShowAddNewField] = useState(false);

  function handleShowContentFieldsClick(contentIndex) {
    setSelectedContentIndex(contentIndex);
    setShowContentFields(!showContentFields);
  }

  function handleTypeChange(event) {
    setType(event.target.value);
  }

  function handleTypeClick() {
    setShowAddNewField(true);
  }

  function handleFieldChange(event) {
    setField(event.target.value);
  }

  function handleFieldClick() {
    setFields([...fields, field]);
  }

  function handleCreateNewContentClick() {
    handleCreateNewContent(type, fields);
  }

  return (
    <div id="content-fields-box">
      <div id="new-content-box">
        <label htmlFor="type">NEW TYPE</label>
        <input
          type="text"
          id="type"
          value={type}
          onChange={handleTypeChange}
          placeholder={'Demo Type'}
        />
        <button onClick={handleTypeClick}>ADD</button>
      </div>

      {contentNames.map((contentName, contentIndex) => {
        return (
          <h1
            key={uuidv4()}
            onClick={() => handleShowContentFieldsClick(contentIndex)}
          >
            {contentName}
          </h1>
        );
      })}

      {showAddNewField && (
        <>
          <div id="new-field-box">
            <label htmlFor="field">NEW FIELD</label>
            <input
              type="text"
              id="field"
              value={field}
              onChange={handleFieldChange}
              placeholder={'Demo Field'}
            />
            <button onClick={handleFieldClick}>ADD</button>
          </div>

          <div id="new-fields">
            {fields.map((field) => {
              return (
                <div key={uuidv4()}>
                  <h1>{field}</h1>
                </div>
              );
            })}
          </div>

          <button onClick={handleCreateNewContentClick}>SUBMIT TYPE</button>
        </>
      )}

      {!showAddNewField && showContentFields && (
        <div id="content-fields">
          {Object.keys(contentFields[selectedContentIndex]).map(
            (contentField) => {
              return (
                <h1 key={uuidv4()} onClick={handleShowContentFieldsClick}>
                  {contentField}
                </h1>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default ContentFields;
