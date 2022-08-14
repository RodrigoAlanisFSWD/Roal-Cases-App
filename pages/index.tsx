import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import { Button } from "../components/atoms/Button";
import { Navbar } from "../components/molecules/Navbar";
import { Categories } from "../components/organisms/Categories";
import { Hero } from "../components/organisms/Hero";
import { References } from "../components/organisms/References";
import styles from "../styles/pages/Home.module.scss";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Footer } from "../components/organisms/Footer";

const Home: NextPage = () => {
  return (
    <div className={styles["home"]}>
      <Navbar />
      <Hero />
      <div className={styles["home__divider"]}>
        <h2>Nuestros Productos</h2>

        <Button className={styles["home__btn"]} text="Comprar Ahora" />
      </div>
      <Categories />
      <References />
      <div className={styles["home__warranty"]}>
        <div className={styles["home__warranty-icon"]}>
          <FontAwesomeIcon
            icon={faCheck}
            className={styles["home__warranty-check"]}
          />
        </div>
        <h3>Te Garantisamos Calidad</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo a at
          optio assumenda consequuntur quas, quo ipsam ducimus rem sequi ex et
          dignissimos neque nemo, ut quaerat dicta recusandae odio.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
