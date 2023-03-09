import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentFields, SideBar } from '../../components';
import {
  BACKEND_URL,
  CREATE_CONTENT,
  GET_CONTENTS,
} from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest';

function ContentFieldsPage() {
  const navigate = useNavigate();

  const [contents, setContents] = useState(null);
  const [contentNames, setContentNames] = useState(null);
  const [contentFields, setContentFields] = useState(null);

  const [showContentFields, setShowContentFields] = useState(false);

  useEffect(() => {
    makeRequest(BACKEND_URL, true, GET_CONTENTS, {}, navigate)
      .then((response) => {
        setContents(response);

        const contentNames = [];

        response.forEach((content) => {
          contentNames.push(content.name);
        });

        setContentNames(contentNames);

        const contentFields = [];

        response.forEach((content) => {
          contentFields.push(content.fields);
        });

        setContentFields(contentFields);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  function handleCreateNewContent(type, fields) {
    const reqBody = {
      name: type,
      fields: {},
    };

    fields.forEach((field) => {
      reqBody.fields[field] = 'string';
    });

    console.log(reqBody);

    makeRequest(
      BACKEND_URL,
      true,
      CREATE_CONTENT,
      {
        data: reqBody,
      },
      navigate
    )
      .then((response) => {
        setContents({ ...contents, response });

        window.location.reload(true);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  console.log('contents', contents);
  console.log('contentNames', contentNames);
  console.log('contentFields', contentFields);

  return (
    <>
      {contentNames ? (
        <>
          <SideBar
            contentNames={contentNames}
            showContentFields={showContentFields}
            setShowContentFields={setShowContentFields}
          />

          {showContentFields && (
            <ContentFields
              contentNames={contentNames}
              contentFields={contentFields}
              handleCreateNewContent={handleCreateNewContent}
            />
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default ContentFieldsPage;
