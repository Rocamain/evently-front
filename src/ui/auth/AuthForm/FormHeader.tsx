import { FC } from 'react'
import ProfilePicture from '../../ProfilePicture/ProfilePicture'

interface FormHeaderProps {
  title: string
  profilePicture?: string | null
  loading?: boolean
  withPicture?: boolean
}

const FormHeader: FC<FormHeaderProps> = ({
  title,
  profilePicture,
  loading,
  withPicture = false,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="ml-[52px] text-xl font-semibold">{title}</h1>
      </div>
      {withPicture && (
        <div className="ml-6">
          <ProfilePicture loading={loading} picture={profilePicture} />
        </div>
      )}
    </div>
  )
}

export default FormHeader
