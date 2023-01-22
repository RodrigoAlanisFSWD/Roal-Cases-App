import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../atoms/shared/Button";
import { Navbar } from "../molecules/shared/Navbar";
import { Categories } from "../organisms/home/Categories";
import { Hero } from "../organisms/home/Hero";
import { References } from "../organisms/home/References";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Footer } from "../organisms/shared/Footer";
import { Modal } from "../layouts/Modal";
import { useRouter } from "next/router";

export const Home = () => {

  const router = useRouter()

  return (
    <div>
      <Navbar />
      <Hero />
      <div className="bg-background flex flex-col items-center justify-center">
        <h2 className="mt-12 text-3xl">Nuestros Productos</h2>
        <p className="text-xl mt-4">
          Contamos con diferentes categorias y diseños para todos tus dispositivos.
        </p>

        <Button className="w-3/4 md:w-1/3 xl:w-80 mb-12 mt-8" text="Comprar Ahora" onClick={() => router.push("/products")} />
      </div>
      <Categories />
      <References />
      <div className="flex flex-col items-center w-full p-8">
        <div className="w-20 bg-primary flex rounded-full justify-center items-center h-20">
          <FontAwesomeIcon icon={faCheck} className="text-white text-2xl" />
        </div>
        <h3 className="mt-6 text-2xl">Te Garantisamos Calidad</h3>
        <p className="text-center mt-6 text-secondary max-w-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo a at
          optio assumenda consequuntur quas, quo ipsam ducimus rem sequi ex et
          dignissimos neque nemo, ut quaerat dicta recusandae odio.
        </p>
      </div>
      <Footer />
    </div>
  );
};
