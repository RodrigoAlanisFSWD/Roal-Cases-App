import { FC } from "react";
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { Button } from "../../atoms/shared/Button";
import { FormControl } from "../../atoms/shared/FormControl";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { useSelector } from "react-redux";
import { getProfile, setTokens, signIn } from "../../../services/authService";
import { useDispatch } from "react-redux";
import { authenticateUser, authError, authLoading } from "../../../redux/states/auth";
import { AppStore } from "../../../redux/store";

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

    const loading = useSelector((store: AppStore) => store.auth.loading);

    const dispatch = useDispatch()

    const submit = async (values: any) => {
        try {
            authLoading(true)

            const tokens = await signIn({
                ...values
            })

            setTokens(tokens)

            const profile = await getProfile()

            dispatch(authenticateUser({
                ...tokens,
                profile: profile
            }))

            authLoading(false)

            router.push("/")
        } catch (error) {
            dispatch(authError("Usa Otro Correo O Prueba Mas Tarde"))
        }
    }

    return (
        <div className="w-full max-w-xl h-auto flex flex-col items-center 2xl:max-w-xl 2xl:shadow-md">
            <h2 className="text-3xl mb-14 lg:mt-14">
                Iniciar Sesion
            </h2>

            <div className="w-full bg-background p-4 text-xl text-center text-secondary">
                Ingresa Los Datos Para Continuar
            </div>

            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={SignInSchema}
                onSubmit={submit}
            >
                {({ values, touched, errors, handleSubmit }) => (
                    <Form className="w-full flex flex-col justify-center h-auto py-14 pb-0 px-6 xl:p-14 2xl:py-28 2xl:px-14">
                        <FormControl className="mt-4" placeholder="Correo Electronico" type="email"
                            name="email" icon={faEnvelope} error={errors.email} touched={touched.email} />
                        <FormControl className="mt-4" placeholder="Contrasena" type="password"
                            name="password" icon={faLock} error={errors.password} touched={touched.password} />

                        <Button onClick={handleSubmit} text="Iniciar Sesion" className="mt-9 mb-4" />
                        <Button text="Crear Una Cuenta" type="outlined" onClick={() => router.push("/sign-up")} />
                        {loading ? <span className="flex w-full mt-3 justify-end">
                            Cargando...
                        </span> : null}

                    </Form>
                )}
            </Formik>
        </div>

    )
}
