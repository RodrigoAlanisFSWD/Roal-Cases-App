import { Form, Formik } from 'formik'
import React from 'react'
import { Main } from '../layouts/Main'
import * as Yup from 'yup';
import { FormControl } from "../atoms/shared/FormControl";
import { faCode, faLock } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../atoms/shared/Button';
import { useSelector } from 'react-redux';
import * as authTypes from "../../redux/types/auth";
import { AlertModal } from '../molecules/shared/AlertModal';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { getProfile, setTokens, verifyEmail } from '../../services/authService';
import { authenticateUser, authError, authInitial } from '../../redux/states/auth';
import { AppStore } from '../../redux/store';
import { Modal } from '../layouts/Modal';

export const VerifyEmail = () => {

    const VerifyEmailSchema = Yup.object().shape({
        code: Yup.string()
            .min(6, 'El Codigo Es Muy Corto')
            .required('El Codigo Es Requerido')
    })

    const { state, errorMsg } = useSelector((store: AppStore) => store.auth)

    const dispatch = useDispatch();

    const router = useRouter()

    const submit = async (values: any) => {
        try {
            const tokens = await verifyEmail(values.code)

            setTokens(tokens)

            const profile = await getProfile()

            dispatch(authenticateUser({
                ...tokens,
                profile,
            }))

            router.push("/user")
        } catch (error) {
            dispatch(authError("El Codigo Es Incorrecto"))
        }

    }

    return (
        <>
            <Main>
                <div className="w-full max-w-[400px] row-[2/3] shadow-md p-6">
                    <Formik
                        initialValues={
                            {
                                code: ''
                            }
                        }
                        validationSchema={VerifyEmailSchema}
                        onSubmit={submit}
                    >
                        {
                            ({ touched, errors, handleSubmit }) => (
                                <Form className="flex flex-col justify-center items-center">
                                    <h2 className='text-xl'>
                                        Verificar Correo
                                    </h2>
                                    <FormControl name='code' placeholder='Codigo' type='text' touched={touched.code} error={errors.code} className="mt-6" icon={faLock} />

                                    <Button text='Continuar' onClick={handleSubmit} className="mt-6" />
                                </Form>

                            )
                        }
                    </Formik>
                </div>
            </Main>
            <Modal
                title="Verificacion" show={state === authTypes.AUTH_ERROR} onClose={() => dispatch(authInitial(authTypes.AUTHENTICATED))}
                error={true}
            >
                <h2 className="text-lg">
                    { errorMsg }
                </h2>
            </Modal>
        </>

    )
}