import axios from 'axios';


export const checkEmailExists = (email) => axios.get(`/api/v1.0/auth/exists/email/` + email);
export const checkUsernameExists = (username) => axios.get(`/api/v1.0/auth/exists/username/` + username);

export const localRegister = ({email, username, password}) => axios.post(`/api/v1.0/auth/register/local`, { email, username, password });
export const localLogin = ({email, password}) => axios.post(`/api/v1.0/auth/login/local`, { email, password });

export const checkStatus = () => axios.get(`/api/v1.0/auth/check`);
export const logout = () => axios.post(`/api/v1.0/auth/logout`);