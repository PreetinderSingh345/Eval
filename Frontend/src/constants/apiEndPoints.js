const AUTH_URL = 'http://localhost:5000';
const BACKEND_URL = 'http://localhost:4000';

const SIGNUP = {
  url: '/user',
  method: 'POST',
};

const LOGIN = {
  url: '/login',
  method: 'POST',
};

const CREATE_CONTENT = {
  url: '/createContent',
  method: 'POST',
};

const CREATE_CONTENT_FIELD = (contentId) => ({
  url: `/createContentField/${contentId}`,
  method: 'POST',
});

const UPDATE_CONTENT_FIELD = (contentId) => ({
  url: `/updateContentField/${contentId}`,
  method: 'PUT',
});

const DELETE_CONTENT_FIELD = (contentId, field) => ({
  url: `/deleteContentField/${contentId}/${field}`,
  method: 'DELETE',
});

const CREATE_CONTENT_ENTRY = (contentId) => ({
  url: `/createContentEntry/${contentId}`,
  method: 'POST',
});

const GET_CONTENTS = {
  url: '/contents',
  method: 'GET',
};

const DELETE_CONTENT_ENTRY = (contentId, entryId) => ({
  url: `/deleteContentEntry/${contentId}/${entryId}`,
  method: 'DELETE',
});

module.exports = {
  AUTH_URL,
  BACKEND_URL,
  SIGNUP,
  LOGIN,
  CREATE_CONTENT,
  CREATE_CONTENT_FIELD,
  UPDATE_CONTENT_FIELD,
  DELETE_CONTENT_FIELD,
  CREATE_CONTENT_ENTRY,
  GET_CONTENTS,
  DELETE_CONTENT_ENTRY,
};
