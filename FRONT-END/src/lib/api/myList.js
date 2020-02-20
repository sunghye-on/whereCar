import axios from 'axios';

// Backend에서 API를 만들어야 함.

export const getDrivers = () => axios.get(`/api/v1.0/mylist/drivers`);
