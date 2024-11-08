import axios from 'axios'

export const apiUploadImageCloudinary = (data: FormData) =>
  axios({
    method: 'POST',
    url: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME_CLOUDINARY}/image/upload`,
    data
  })
export const apiGetProvinces = () =>
  axios({
    method: 'GET',
    url: `https://vietnam-administrative-division-json-server-swart.vercel.app/province`
  })
export const apiGetDistricts = (params: string) =>
  axios({
    method: 'GET',
    url: `https://vietnam-administrative-division-json-server-swart.vercel.app/district?idProvince=${params}`
  })
export const apiGetWards = (params: string) =>
  axios({
    method: 'GET',
    url: `https://vietnam-administrative-division-json-server-swart.vercel.app/commune?idDistrict=${params}`
  })
export const apiGetLngLatFromAddress = (params: string) =>
  axios({
    method: 'GET',
    url: `https://api.geoapify.com/v1/geocode/search`,
    params
  })
