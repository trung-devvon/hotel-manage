import instance from '../instance'

export const getFacilities = () =>
  instance({
    method: 'GET',
    url: 'facility/get-all'
  })
