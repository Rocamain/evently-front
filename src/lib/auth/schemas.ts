import { z } from 'zod'

const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/webp']
const MIN_UPLOAD_SIZE = 1024 * 1024 // 1MB

export const SigninFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string().trim(),
})

const FileArraySchema = z
  .array(
    z
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
          return !file || file.size >= MIN_UPLOAD_SIZE
        },
        {
          message: 'File size must be more than 1MB',
          path: ['profilePicture'],
        },
      ),
  )
  .min(1, 'Registration requires a profile picture')
  .max(1, 'Registration requires a profile picture')

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
    profilePicture: FileArraySchema,
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
