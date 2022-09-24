import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "../../atoms/shared/Button";
import {
  faInstagram,
  faTwitter,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <>
      <footer className="w-full bg-dark p-8 grid grid-cols-1 lg:grid-cols-2 items-start py-14 px-24 gap-y-5">
        <div className="w-full flex flex-col items-center lg:grid grid-cols-[1fr_25%] gap-3">
          <h3 className="text-white text-xl mb-4">NEWSPAPER</h3>

          <input
            type="email"
            name="email"
            placeholder="Ingresa Tu Correo"
            className="w-full p-3 h-11 rounded-sm mb-6 outline-none row-[2/3] bg-white border-none lg:mb-0 placeholder:text-secondary"
          />

          <Button text="UNETE" className="w-full lg:col-[2/3] lg:row-[2/3]" />
        </div>
        <div className="w-full flex flex-col items-center p-6 lg:col-[1/2] lg:p-0 lg:items-start">
          <h3 className="text-white text-xl mb-6">Vuelvete De Los Nuestros</h3>

          <div className="w-full flex justify-center lg:w-auto">
            <div className="w-10 h-10 bg-background rounded-full flex justify-center items-center text-xl text-dark ml-6 transition-all duration-300 cursor-pointer hover:text-background hover:bg-dark ml-0">
              <FontAwesomeIcon icon={faInstagram} />
            </div>
            <div className="w-10 h-10 bg-background rounded-full flex justify-center items-center text-xl text-dark ml-6 transition-all duration-300 cursor-pointer hover:text-background hover:bg-dark">
              <FontAwesomeIcon icon={faTwitter} />
            </div>
            <div className="w-10 h-10 bg-background rounded-full flex justify-center items-center text-xl text-dark ml-6 transition-all duration-300 cursor-pointer hover:text-background hover:bg-dark">
              <FontAwesomeIcon icon={faTiktok} />
            </div>
          </div>
        </div>
        <div className="w-full text-white text-xl flex items-center flex-col p-6 pt-0 lg:col-[2/3] lg:row-[1/2] lg:items-start">
          <h4>Horario De Asistencia</h4>

          <p className="text-left">
            Lun - Domingo: 10 am - 10 pm <br />
            Via Instagram | Correo Electronico
          </p>
        </div>
        <div className="text-primary flex items-center flex-col lg:items-start lg:px-6">
          <span className="mb-4">Ayuda</span>
          <span className="mb-4">Como Comprar ?</span>
        </div>
      </footer>
      <div className="bg-dark border-t border-background p-3 flex justify-center text-white">
        Politica De Privacidad | Roal Cases 2022 &copy;
      </div>
    </>
  );
};
