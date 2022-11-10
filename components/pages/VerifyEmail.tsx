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
import { getProfile, verifyEmail } from '../../services/authService';
import { authenticateUser, authError, authInitial } from '../../redux/states/auth';
import { AppStore } from '../../redux/store';

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

            const profile = await getProfile()

            dispatch(authenticateUser({
                ...tokens,
                profile,
            }))

            router.push("/profile")
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
            {
                state === authTypes.AUTH_ERROR ?
                    <AlertModal onClose={() => authInitial(authTypes.AUTHENTICATED)} title="Verificar Correo" body={errorMsg} />
                    : null
            }
        </>

    )
}