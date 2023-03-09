import axios from 'axios';
import { ERROR_ROUTE } from '../../constants/routes';

const makeRequest = async (
  baseURL,
  tokenValidate,
  apiEndPoint,
  dynamicConfig = {},
  navigate
) => {
  try {
    if (tokenValidate) {
      const token = localStorage.getItem('token');

      const requestDetails = {
        baseURL,
        url: apiEndPoint.url,
        method: apiEndPoint.method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        ...dynamicConfig,
      };

      const { data } = await axios(requestDetails);

      return data;
    } else {
      const requestDetails = {
        baseURL,
        url: apiEndPoint.url,
        method: apiEndPoint.method,
        ...dynamicConfig,
      };

      const { data } = await axios(requestDetails);

      return data;
    }
  } catch (error) {
    if (navigate) {
      const errorStatus = error.response?.status;

      if (errorStatus) {
        navigate(`${ERROR_ROUTE}/${errorStatus}`);
      } else {
        navigate(ERROR_ROUTE);
      }
    }
  }
};

export default makeRequest;
