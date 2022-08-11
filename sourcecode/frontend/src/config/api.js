import getEnvVariable from '../helpers/getEnvVariable.js';

const apiConfig = {
    url: getEnvVariable('REACT_APP_API_URL', 'https://api.mysecondbrain.test'),
};

export default apiConfig;
