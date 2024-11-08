import instance from '../instance'
import { FieldValues, SubmitHandler } from 'react-hook-form'

export const apiCreateNewDestination: SubmitHandler<FieldValues> = (data) =>
  instance({
    method: 'POST',
    url: 'destination/create',
    data: data
  })
export const apiGetAllDestination = () =>
  instance({
    method: 'GET',
    url: 'destination/get-all'
  })
export const apiGetDestination = (params: any) =>
  instance({
    method: 'GET',
    url: 'destination/get',
    params
  })
