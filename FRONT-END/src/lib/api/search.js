import axios from 'axios';

// Backend에서 API를 만들어야 함.

export const groupByKeywords = ({keywords}) => {
  const keywordsList = keywords.split(' ').filter(str => str !== '');
  let keys = ''
  for(const i in keywordsList){
    keys += i == 0
      ? keywordsList[i]
      : `+${keywordsList[i]}`;
  }
  return axios.get(`/api/v1.0/search/group/?keywords=${keys}`)
};
export const groupByKeyword = ({keyword}) => axios.get(`/api/v1.0/mylist/drivers`);
