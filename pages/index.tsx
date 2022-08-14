import type { NextPage } from 'next'
import { Button } from '../components/atoms/Button';
import { Navbar } from '../components/molecules/Navbar';
import { Categories } from '../components/organisms/Categories';
import { Hero } from '../components/organisms/Hero';
import { References } from '../components/organisms/References';
import styles from '../styles/pages/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles['home']} >
      <Navbar />
      <Hero />
      <div className={styles['home__divider']}>
        <h2>
          Nuestros Productos
        </h2>

        <Button className={styles['home__btn']} text="Comprar Ahora" />
      </div>
      <Categories />
      <References />
    </div>
  )
}

export default Home
