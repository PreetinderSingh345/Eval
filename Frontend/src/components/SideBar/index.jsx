import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './SideBar.css';

function SideBar({
  contentNames,
  setShowContentFieldsOrEntries,
  setSelectedContentIndex,
}) {
  function handleShowContentFieldsOrEntriesClick(event, index) {
    const id = event.target.id;

    if (id === 'fields-button') {
      setShowContentFieldsOrEntries('fields');
    } else {
      setShowContentFieldsOrEntries('entries');
      setSelectedContentIndex(index);
    }
  }

  return (
    <div id="sidebar">
      <div>COLLECTION TYPES</div>

      <div id="content-types-sidebar">
        {contentNames.map((contentName, index) => {
          return (
            <button
              key={uuidv4()}
              id="entries-button"
              onClick={(event) =>
                handleShowContentFieldsOrEntriesClick(event, index)
              }
            >
              {contentName}
            </button>
          );
        })}
      </div>

      <button
        id="fields-button"
        onClick={handleShowContentFieldsOrEntriesClick}
      >
        CONTENT TYPE BUILDER
      </button>
    </div>
  );
}

export default SideBar;
