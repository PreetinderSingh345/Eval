import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContentEntries, SideBar } from '../../components';
import { BACKEND_URL, GET_CONTENTS } from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest';

function ContentEntriesPage() {
  const navigate = useNavigate();
  const { contentId } = useParams();

  const [contents, setContents] = useState(null);
  const [contentNames, setContentNames] = useState(null);

  useEffect(() => {
    makeRequest(BACKEND_URL, true, GET_CONTENTS, {}, navigate)
      .then((response) => {
        setContents(response);

        const contentNames = [];

        response.forEach((content) => {
          contentNames.push(content.name);
        });

        setContentNames(contentNames);

        
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  console.log(contents);

  return (
    <>
      <SideBar />
      <ContentEntries />
    </>
  );
}

export default ContentEntriesPage;
