import axios from 'axios';

// Backend에서 API를 만들어야 함.

export const getDrivers = () => axios.get(`/api/v1.0/mylist/drivers`);

// 자동차 관련
export const getCars = ({id}) => axios.get(`/api/v1.0/admin/cars/`+id);
export const getCar = ({id}) => axios.get(`/api/v1.0/admin/car/`+id);
// 코스 관련
export const getCourses = ({id}) => axios.get(`/api/v1.0/admin/courses/`+id);
export const getCourse = ({id}) => axios.get(`/api/v1.0/admin/course/`+id);
