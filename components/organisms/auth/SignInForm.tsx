import {FC} from "react";
import styles from '../../../styles/organisms/auth/AuthForm.module.scss'
import {faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'
import {Button} from "../../atoms/shared/Button";
import {FormControl} from "../../atoms/shared/FormControl";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import * as Yup from 'yup';

export const SignInForm: FC = () => {

    const router = useRouter();

    const SignInSchema = Yup.object().shape({
        email: Yup.string()
            .email('El Email Es Incorrecto')
            .required('El Email Es Obligatorio'),
        password: Yup.string()
            .min(5, 'La Contrasena Es Muy Corta')
            .required('La Contrasena Es Obligatoria'),
    })

    return (
        <div className={styles['authForm']}>
            <h2>
                Iniciar Sesion
            </h2>

            <div className={styles['authForm__divider']}>
                Ingresa Los Datos Para Continuar
            </div>

            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={SignInSchema}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >
                {({ values, touched, errors }) => (
                    <Form className={styles['authForm__form']}>
                        <FormControl className={styles['authForm__input']} placeholder="Correo Electronico" type="email"
                             name="email" icon={faEnvelope} error={errors.email} touched={touched.email} />
                <FormControl className={styles['authForm__input']} placeholder="Contrasena" type="password"
                             name="password" icon={faLock} error={errors.password} touched={touched.password} />

                <Button text="Iniciar Sesion" className={styles['authForm__btn']}/>
                <Button text="Crear Una Cuenta" type="outlined" onClick={() => router.push("/sign-up")}/>
                    </Form>
                )}
            </Formik>
        </div>

    )
}