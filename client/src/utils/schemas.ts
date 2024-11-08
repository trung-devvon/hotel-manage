import * as yup from 'yup'

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Bạn chưa nhập lại mật khẩu [!]')
    .min(6, 'Độ dài từ 6 - 16 ký tự [!]')
    .max(16, 'Độ dài từ 6 - 16 ký tự [!]')
    .oneOf([yup.ref(refString)], 'Nhập lại mật khẩu chưa đúng [!]')
}
export const loginSchema = yup.object({
  email: yup
    .string()
    .required('không được bỏ trống')
    .email('Email không đúng định dạng')
    .min(10, 'Độ dài tối thiểu 10 kí tự')
    .max(50, 'Độ dài tối đa 50 kí tự'),
  password: yup.string().required().min(6, 'password 6-16 kí tự').max(16, 'password 6-16 kí tự')
})
export const schema = yup.object({
  name: yup
    .string()
    .required('Không được bỏ trống [!]')
    .trim()
    .min(8, 'Độ dài tối thiểu 8 kí tự [!]')
    .max(30, 'Độ dài tối đa 30 kí tự [!]'),
  email: yup
    .string()
    .required('Không được bỏ trống [!]')
    .trim()
    .email('Email không đúng định dạng [!]')
    .min(10, 'Độ dài tối thiểu 10 kí tự [!]')
    .max(50, 'Độ dài tối đa 50 kí tự [!]'),
  password: yup
    .string()
    .required('Không được bỏ trống [!]')
    .trim()
    .min(6, 'Mật khẩu 6-16 kí tự [!]')
    .max(16, 'Mật khẩu 6-16 kí tự [!]'),
  confirmPassword: handleConfirmPasswordYup('password')
})
export const destinationSchema = yup.object({
  name: yup
    .string()
    .required('Không được bỏ trống [!]')
    .trim()
    .min(4, 'Độ dài tối thiểu 4 kí tự [!]')
    .max(50, 'Độ dài tối đa 50 kí tự [!]')
})
export const hotelSchema = yup.object({
  name: yup
    .string()
    .required('Không được bỏ trống [!]')
    .trim()
    .min(4, 'Độ dài tối thiểu 4 kí tự [!]')
    .max(50, 'Độ dài tối đa 50 kí tự [!]'),
  address: yup
    .string()
    .required('Không được bỏ trống [!]')
    .trim()
    .min(4, 'Độ dài tối thiểu 4 kí tự [!]')
    .max(200, 'Độ dài tối đa 200 kí tự [!]')
})
export const hotelTypeSchema = yup.object({
  name: yup
    .string()
    .required('Không được bỏ trống [!]')
    .trim()
    .min(4, 'Độ dài tối thiểu 4 kí tự [!]')
    .max(50, 'Độ dài tối đa 50 kí tự [!]')
})
export type DestinationSchema = yup.InferType<typeof destinationSchema>
export type HotelSchema = yup.InferType<typeof hotelSchema>
export type Schema = yup.InferType<typeof schema>
export type LoginSchema = yup.InferType<typeof loginSchema>
export type HotelTypeSchema = yup.InferType<typeof hotelTypeSchema>
