import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  BACKEND_URL,
  CREATE_CONTENT,
  CREATE_CONTENT_FIELD,
  DELETE_CONTENT_FIELD,
  UPDATE_CONTENT_FIELD,
} from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest';
import './ContentFields.css';

function contentFields({
  contentNames,
  contentFields,
  contentEntriesCount,
  contentIds,
}) {
  const navigate = useNavigate();

  const [type, setType] = useState('');
  const [field, setField] = useState('');
  const [updateFieldValues, setUpdateFieldValues] = useState(null);
  const [showFields, setShowFields] = useState(false);
  const [selectedContentIndex, setSelectedContentIndex] = useState(null);

  function handleInputChangeType(event) {
    setType(event.target.value);
  }

  function handleAddType(event) {
    event.preventDefault();

    console.log('ADD THIS TYPE', type);

    makeRequest(
      BACKEND_URL,
      true,
      CREATE_CONTENT,
      {
        data: {
          name: type,
        },
      },
      navigate
    )
      .then((response) => {
        console.log('ADD THIS TYPE RESPONSE', response);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  function handleInputChangeField(event) {
    setField(event.target.value);
  }

  function handleAddField(event) {
    event.preventDefault();

    console.log('ADD THIS FIELD', field);

    makeRequest(
      BACKEND_URL,
      true,
      CREATE_CONTENT_FIELD(contentIds[selectedContentIndex]),
      {
        data: {
          field,
        },
      },
      navigate
    )
      .then((response) => {
        console.log('ADD THIS FIELD RESPONSE', response);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  function handleRemoveField(field) {
    console.log('REMOVE THIS FIELD', field);

    makeRequest(
      BACKEND_URL,
      true,
      DELETE_CONTENT_FIELD(contentIds[selectedContentIndex], field),
      {},
      navigate
    )
      .then((response) => {
        console.log('REMOVE THIS FIELD RESPONSE', response);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  function handleInputChangeUpdateFieldValues(event, index) {
    const newUpdateFieldValues = [...updateFieldValues];

    newUpdateFieldValues[index] = event.target.value;

    setUpdateFieldValues(newUpdateFieldValues);
  }

  function handleUpdateFieldValues(event, index) {
    event.preventDefault();

    console.log('UPDATE THIS FIELD', updateFieldValues[index]);

    makeRequest(
      BACKEND_URL,
      true,
      UPDATE_CONTENT_FIELD(contentIds[selectedContentIndex]),
      {
        data: {
          prevFieldValue: Object.keys(contentFields[selectedContentIndex])[0],
          newFieldValue: updateFieldValues[index],
        },
      },
      navigate
    )
      .then((response) => {
        console.log('UPDATE THIS FIELD RESPONSE', response);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  function handleShowFields(index) {
    setUpdateFieldValues(new Array(contentFields[index].length).fill(''));

    if (!showFields) {
      setSelectedContentIndex(index);
    }

    setShowFields(!showFields);
  }

  return (
    <div id="content-fields">
      <div id="content-fields-left">
        <form onSubmit={handleAddType}>
          <input
            type="text"
            id="type"
            name="type"
            value={type}
            onChange={handleInputChangeType}
          />
          <button type="submit">Add Type</button>
        </form>

        <div id="content-types-content-fields">
          {contentNames.map((contentName, index) => {
            return (
              <button
                key={uuidv4()}
                id="entries-button"
                onClick={() => handleShowFields(index)}
              >
                {contentName}
              </button>
            );
          })}
        </div>
      </div>

      <div id="content-fields-right">
        {showFields && (
          <>
            <form onSubmit={handleAddField}>
              <input
                type="text"
                id="field"
                name="field"
                value={field}
                onChange={handleInputChangeField}
              />
              <button type="submit">Add Field</button>
            </form>

            <div id="content-fields">
              {Object.keys(contentFields[selectedContentIndex]).map(
                (contentField, index) => {
                  return (
                    <>
                      <div
                        key={uuidv4()}
                        onClick={() => handleRemoveField(contentField)}
                      >
                        {contentField}
                      </div>

                      {contentEntriesCount[selectedContentIndex] === 0 && (
                        <form
                          onSubmit={(event) =>
                            handleUpdateFieldValues(event, index)
                          }
                        >
                          <input
                            type="text"
                            id="update-field"
                            name="update-field"
                            value={updateFieldValues[index]}
                            onChange={(event) =>
                              handleInputChangeUpdateFieldValues(event, index)
                            }
                          />
                          <button type="submit">Update Field</button>
                        </form>
                      )}
                    </>
                  );
                }
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default contentFields;
