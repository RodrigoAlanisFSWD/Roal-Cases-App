import { Form, Formik } from 'formik'
import React from 'react'
import { Main } from '../layouts/Main'
import * as Yup from 'yup';
import { FormControl } from "../atoms/shared/FormControl";
import { faCode, faLock } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../atoms/shared/Button';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store';
import { useAuthService } from '../../services/authService';
import * as authTypes from "../../store/types/auth";
import { AlertModal } from '../molecules/shared/AlertModal';
import { useRouter } from 'next/router';

export const VerifyEmail = () => {

    const VerifyEmailSchema = Yup.object().shape({
        code: Yup.string()
            .min(6, 'El Codigo Es Muy Corto')
            .required('El Codigo Es Requerido')
    })

    const { state, errorMsg } = useSelector((store: StoreState) => store.auth)

    const {setInitial, verifyMail} = useAuthService()

    const router = useRouter()

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
                        onSubmit={async (values) => {
                            await verifyMail(values.code)

                            router.push("/profile")
                        }}
                    >
                        {
                            ({ values, touched, errors, handleSubmit }) => (
                                <Form className="flex flex-col justify-center items-center">
                                    <h2>
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
                    <AlertModal onClose={() => setInitial(authTypes.AUTHENTICATED)} title="Verificar Correo" body={errorMsg} />
                    : null
            }
        </>

    )
}
