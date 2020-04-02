import axios from 'axios';

// Backend에서 API를 만들어야 함.

export const getManagers = () => axios.get(`/api/v1.0/admin/managers`);

export const updateManagers = ({ Users, Drivers }) => axios.post(`/api/v1.0/admin/managers`, {Users, Drivers});
