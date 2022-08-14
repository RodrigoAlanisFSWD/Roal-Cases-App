import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from '../../styles/organisms/Footer.module.scss'
import { Button } from '../atoms/Button'
import { faInstagram, faTwitter, faTiktok } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <>
    <footer className={styles['footer']}>
        <div className={styles['footer__newspaper']}>
        <h3>
            NEWSPAPER
            </h3>

            <input type="email" name='email' placeholder='Ingresa Tu Correo' className={styles['footer__input']} />

            <Button text="UNETE" />
        </div>
        <div className={styles['footer__socials']}>
            <h3>
                Vuelvete De Los Nuestros
            </h3>

            <div className={styles['footer__social-icons']}>
                <div className={styles['footer__social-icon']}>
                    <FontAwesomeIcon icon={faInstagram} />
                </div>
                <div className={styles['footer__social-icon']}>
                    <FontAwesomeIcon icon={faTwitter} />
                </div>
                <div className={styles['footer__social-icon']}>
                    <FontAwesomeIcon icon={faTiktok} />
                </div>
            </div>
        </div>
        <div className={styles['footer__attendance']}>
            <h4>
                Horario De Asistencia
            </h4>

            <p>
                Lun - Domingo: 10 am - 10 pm <br />
                Via Instagram | Correo Electronico
            </p>
        </div>
        <div className={styles['footer__help']}>
            <span>
                Ayuda
            </span>
            <span>
                Como Comprar ?
            </span>
        </div>
    </footer>
    <div className={styles['under-footer']}>
        Politica De Privacidad | Roal Cases 2022 &copy;
    </div>
    </>
    
  )
}
