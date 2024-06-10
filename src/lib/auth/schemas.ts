import { z } from 'zod'

const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/webp']
const MAX_UPLOAD_SIZE = 1024 * 1024 * 10 // 10MB

export const SigninFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string().trim(),
})

export const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: 'Name must be at least 4 characters long.' })
      .trim(),
    surname: z
      .string()
      .min(3, { message: 'Surname must be at least 3 characters long.' })
      .trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .trim(),
    passwordConfirmation: z.string().trim(),
    profilePicture: z
      .custom<File>()
      .refine(
        (file) => {
          return ACCEPTED_FILE_TYPES.includes(file.type)
        },
        {
          message: 'File must be a JPG OR WEBP',
          path: ['profilePicture'],
        },
      )
      .refine(
        (file) => {
          return !file || file.size <= MAX_UPLOAD_SIZE
        },
        {
          message: 'File size must be less than 10MB',
          path: ['profilePicture'],
        },
      ),
  })
  .refine(
    (values) => {
      return values.password === values.passwordConfirmation
    },
    {
      message: 'Passwords must match!',
      path: ['password'],
    },
  )
