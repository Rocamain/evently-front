import { cookies } from 'next/headers'

async function fetchDevice() {
  const cookiesList = await cookies()
  const device = cookiesList.get('X-Device')?.value
  return device
}

export default fetchDevice
