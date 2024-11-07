import { headers } from 'next/headers'

function fetchDevice() {
  const headersList = headers()
  const device = headersList.get('X-Device')!

  return device
}

export default fetchDevice
