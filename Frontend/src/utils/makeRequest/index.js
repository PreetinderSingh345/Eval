import axios from 'axios';
import { BACKEND_URL } from '../../constants/apiEndPoints';
import { ERROR_ROUTE } from '../../constants/routes';

const makeRequest = async (apiEndPoint, dynamicConfig = {}, navigate) => {
  try {
    const requestDetails = {
      baseURL: BACKEND_URL,
      url: apiEndPoint.url,
      method: apiEndPoint.method,
      ...dynamicConfig,
    };

    const { data } = await axios(requestDetails);

    return data;
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
