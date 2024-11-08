import instance from '../instance'
import { FieldValues, SubmitHandler } from 'react-hook-form'

export const apiCreateNewHotel: SubmitHandler<FieldValues> = (data) =>
  instance({
    method: 'POST',
    url: 'hotel/create',
    data: data
  })
export const apiGetHotels: SubmitHandler<FieldValues> = (params) =>
  instance({
    method: 'GET',
    url: 'hotel/',
    params
  })
export const apiSearchHotelByKeyword = (keyword: string) =>
  instance({
    method: 'GET',
    url: `hotel/search?keyword=${keyword}`
  })
export const apiAddRules: SubmitHandler<FieldValues> = (data, hotelId) =>
  instance({
    method: 'POST',
    url: 'hotel/add-rule/' + hotelId,
    data
  })
export const apiCreateNewHotelType: SubmitHandler<FieldValues> = (data) =>
  instance({
    method: 'POST',
    url: 'hotelType/create-new',
    data
  })
export const apiGetAllHotelTypes = () =>
  instance({
    method: 'GET',
    url: 'hotelType/all'
  })
