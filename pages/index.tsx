import type { NextPage } from 'next'
import { Navbar } from '../components/molecules/Navbar';
import { Hero } from '../components/organisms/Hero';

const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  )
}

export default Home
