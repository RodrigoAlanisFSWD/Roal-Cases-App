import {FC} from "react";
import styles from '../../../styles/organisms/auth/AuthForm.module.scss'
import {faEnvelope, faLock, faUser} from '@fortawesome/free-solid-svg-icons'
import {Button} from "../../atoms/shared/Button";
import {FormControl} from "../../atoms/shared/FormControl";
import {useRouter} from "next/router";
import {Form, Formik} from "formik";
import * as Yup from 'yup';
import {useAuthService} from "../../../services/authService";
import {useSelector} from "react-redux";
import {StoreState} from "../../../store";

export const SignUpForm: FC = () => {

    const router = useRouter();

    const SignUpSchema = Yup.object().shape({
        name: Yup.string()
            .min(5, 'El Nombre Es Muy Corto')
            .required('El Nombre Es Obligatorio'),
        email: Yup.string()
            .email('El Email Es Incorrecto')
            .required('El Email Es Obligatorio'),
        password: Yup.string()
            .min(5, 'La Contrasena Es Muy Corta')
            .required('La Contrasena Es Obligatoria'),
    });

    const {signUp, setLoading} = useAuthService();

    const loading = useSelector((store: StoreState) => store.auth.loading);

    return (
        <div className={styles['authForm']}>
            <h2>
                Crear Una Cuenta
            </h2>

            <div className={styles['authForm__divider']}>
                Ingresa Los Datos Para Crear Tu Cuenta w
            </div>

            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: ''
                }}
                validationSchema={SignUpSchema}
                onSubmit={async (values) => {
                    setLoading(true);

                    await signUp({
                        ...values,
                    });

                    setLoading(false)
                }}
            >
                {({values, touched, errors, handleSubmit}) => (
                    <Form className={styles['authForm__form']}>
                        <FormControl className={styles['authForm__input']} placeholder="Nombre" type="text"
                                     name="name" icon={faUser} error={errors.name} touched={touched.name}/>
                        <FormControl className={styles['authForm__input']} placeholder="Correo Electronico" type="email"
                                     name="email" icon={faEnvelope} error={errors.email} touched={touched.email}/>
                        <FormControl className={styles['authForm__input']} placeholder="Contrasena" type="password"
                                     name="password" icon={faLock} error={errors.password} touched={touched.password}/>

                        <Button onClick={handleSubmit} text="Crear" className={styles['authForm__btn']}/>
                        <Button text="Iniciar Sesion" type="outlined" onClick={() => router.push("/sign-in")}/>
                        {loading ? <span className={styles['authForm__loading']}>
                            Cargando...
                        </span> : null}
                    </Form>
                )}
            </Formik>

        </div>

    )
}
