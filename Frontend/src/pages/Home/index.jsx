import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SideBar, ContentFields, ContentEntries } from '../../components';
import {
  BACKEND_URL,
  CREATE_CONTENT_ENTRY,
  DELETE_CONTENT_ENTRY,
  GET_CONTENTS,
} from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest';
import './Home.css';

function Home() {
  const [showContentFieldsOrEntries, setShowContentFieldsOrEntries] =
    useState('fields');

  const [contents, setContents] = useState(null);
  const [contentIds, setContentIds] = useState(null);
  const [contentNames, setContentNames] = useState(null);
  const [contentFields, setContentFields] = useState(null);
  const [contentEntries, setContentEntries] = useState(null);
  const [contentEntriesCount, setContentEntriesCount] = useState(null);

  const [selectedContentIndex, setSelectedContentIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('inside use effect');

    makeRequest(BACKEND_URL, true, GET_CONTENTS, {}, navigate)
      .then((response) => {
        setContents(response);

        console.log('response', response);

        const contentIds = [];
        const contentNames = [];
        const contentFields = [];
        const contentEntries = [];
        const contentEntriesCount = [];

        response.forEach((content) => {
          contentIds.push(content.id);
          contentNames.push(content.name);
          contentFields.push(content.fields);
          contentEntries.push(content.entries);
          contentEntriesCount.push(Object.keys(content.entries).length);
        });

        setContentIds(contentIds);
        setContentNames(contentNames);
        setContentFields(contentFields);
        setContentEntries(contentEntries);
        setContentEntriesCount(contentEntriesCount);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  function handleCreateNewEntry(entry) {
    console.log('entry', entry);

    makeRequest(
      BACKEND_URL,
      true,
      CREATE_CONTENT_ENTRY(contentIds[selectedContentIndex]),
      { data: entry },
      navigate
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  function handleDeleteEntry(entryId) {
    const deleteContentId = contentIds[selectedContentIndex];

    makeRequest(
      BACKEND_URL,
      true,
      DELETE_CONTENT_ENTRY(deleteContentId, entryId),
      {},
      navigate
    )
      .then((response) => {
        console.log('delete response', response);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  console.log('contents', contents);
  console.log('contentNames', contentNames);
  console.log('contentEntries', contentEntries);
  console.log('contentEntriesCount', contentEntriesCount);

  return (
    <main>
      {contents ? (
        <>
          <SideBar
            contentNames={contentNames}
            setShowContentFieldsOrEntries={setShowContentFieldsOrEntries}
            setSelectedContentIndex={setSelectedContentIndex}
          />

          <div id="content-fields-entries">
            {showContentFieldsOrEntries === 'fields' ? (
              <ContentFields
                contentNames={contentNames}
                contentFields={contentFields}
                contentEntriesCount={contentEntriesCount}
                contentIds={contentIds}
              />
            ) : (
              <ContentEntries
                entries={contentEntries[selectedContentIndex]}
                fields={contentFields[selectedContentIndex]}
                handleCreateNewEntry={handleCreateNewEntry}
                handleDeleteEntry={handleDeleteEntry}
              />
            )}
          </div>
        </>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </main>
  );
}

export default Home;
