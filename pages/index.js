import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <title>Spotify</title>
      <main>
        <Sidebar/>
        {/* center */}
      </main>
      <div>
        {/* player */}
      </div>
    </div>
  )
}
