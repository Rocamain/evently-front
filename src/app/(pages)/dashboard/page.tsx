import { fetchGeo } from '@/lib/utils/geo'

export default async function DashBoardPage() {
  const { city, latitude, longitude } = await fetchGeo()

  console.log('In dashboard', city, latitude, longitude)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Eventy Dashboard</h1>
    </main>
  )
}
