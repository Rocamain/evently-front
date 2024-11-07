import { headers } from 'next/headers'
type Device = {
  type: string
}
async function fetchDevice() {
  const headersList = await headers()
  const device = headersList.get('X-Device')!
  console.log(typeof device, device)
  return device
}

export default fetchDevice
