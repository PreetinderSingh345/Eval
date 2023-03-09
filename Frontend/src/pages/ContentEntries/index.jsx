import React from 'react';
import { useParams } from 'react-router-dom';
import { ContentEntries, SideBar } from '../../components';

function ContentEntries() {
  const { contentId } = useParams();

  return (
    <>
      <SideBar />
      <ContentEntries />
    </>
  );
}

export default ContentEntries;
