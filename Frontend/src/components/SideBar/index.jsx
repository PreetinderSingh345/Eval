import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './SideBar.css';

function SideBar({ contentNames, showContentFields, setShowContentFields }) {
  function handleContentBuilderClick() {
    setShowContentFields(!showContentFields);
  }

  return (
    <div id="sidebar">
      <div>COLLECTION TYPES</div>

      {contentNames.map((contentName) => {
        return <h1 key={uuidv4()}>{contentName}</h1>;
      })}

      <button onClick={handleContentBuilderClick}>CONTENT TYPE BUILDER</button>
    </div>
  );
}

export default SideBar;
