import { IDestinationsSelect } from './destination.interface'
import { IFacilityState } from './facility.interface'

export interface IHotelTypes {
  code: string
  hotelData: any
  id: string
  image: string
  name: string
}
export enum HotelStatus {
  ROOMS = 'ROOMS',
  OUT_OF_ROOMS = 'OUT_OF_ROOMS'
}
export interface IHotels {
  id: string
  name: string
  address: string
  description: string
  images: string[]
  destinationCode: string
  destinationData: IDestinationsSelect
  facilities: IFacilityState[]
  rules: any
  star: number
  status: HotelStatus
  typeCode: string
  lnglat: string[]
  createdAt: Date
  updateAt: Date
}
