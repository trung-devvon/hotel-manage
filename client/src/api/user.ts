import { LoginSchema, Schema } from '@utils/schemas'
import instance from '../instance'

type FormData = Pick<Schema, 'email' | 'password' | 'name'>
export const apiRegister = (data: FormData) =>
  instance({
    method: 'POST',
    url: 'user/register',
    data
  })
export const apiLogin = (data: LoginSchema) =>
  instance({
    method: 'POST',
    url: 'user/login',
    data
  })
export const apiGetCurrent = () =>
  instance({
    method: 'GET',
    url: 'user/getCurrent'
  })
export const apiGetRoles = () =>
  instance({
    method: 'GET',
    url: 'user/check'
  })
